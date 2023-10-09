create extension if not exists "http" with schema "extensions";


create extension if not exists "supabase-dbdev" with schema "public" version '0.0.3';

drop trigger if exists "on_user_create" on "public"."attributes";

drop trigger if exists "on_shop_delete" on "public"."shops";

drop policy "enable all ops for admins" on "public"."attributes";

drop policy "enable read access for authenticated users" on "public"."attributes";

drop policy "Enable read access for all users" on "public"."categories";

drop policy "enable all ops for admins" on "public"."categories";

drop policy "Enable insert access for all users" on "public"."newsletter_emails";

drop policy "Enable delete for users based on user_id" on "public"."notifications";

drop policy "Enable read for users based on user_id" on "public"."notifications";

drop policy "Enable read access for all users on public shops" on "public"."products";

drop policy "enable delete for shopowners" on "public"."products";

drop policy "enable insert for shopowners (< 50 products if not verified)" on "public"."products";

drop policy "enable read access for shopowners on their products" on "public"."products";

drop policy "enable update for shopowners" on "public"."products";

drop policy "enable insert for anon" on "public"."shopowner_landingpage_data";

drop policy "Enable delete for is_claims_admin" on "public"."shops";

drop policy "Enable read access for all users on active, verified shops" on "public"."shops";

drop policy "enable delete for shopowners" on "public"."shops";

drop policy "enable insert for all users with < 1 shop" on "public"."shops";

drop policy "enable read access for admins" on "public"."shops";

drop policy "enable read access for shopowners" on "public"."shops";

drop policy "enable update for is_claims_admin" on "public"."shops";

drop policy "enable update for unverified shops" on "public"."shops";

drop policy "enable update for verified shops" on "public"."shops";

alter table "public"."newsletter_emails" drop constraint "newsletter_emails_email_key";

drop function if exists "public"."handle_user_create"();

alter table "public"."newsletter_emails" drop constraint "newsletter_emails_pkey";

alter table "public"."shopowner_landingpage_data" drop constraint "shopowner_landingpage_data_pkey";

drop index if exists "public"."newsletter_emails_email_key";

drop index if exists "public"."newsletter_emails_pkey";

drop index if exists "public"."shopowner_landingpage_data_pkey";

drop table "public"."newsletter_emails";

drop table "public"."shopowner_landingpage_data";

create table "public"."group_users" (
    "id" uuid not null default uuid_generate_v4(),
    "group_id" uuid not null,
    "user_id" uuid not null,
    "role" text not null default ''::text,
    "created_at" timestamp with time zone default now()
);


alter table "public"."group_users" enable row level security;

create table "public"."groups" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null default ''::text,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."groups" enable row level security;

alter table "public"."shops" add column "max_products" bigint default '50'::bigint;

alter table "public"."shops" add column "slogan" text not null;

alter table "public"."shops" alter column "owner_id" set default auth.uid();

CREATE UNIQUE INDEX group_pkey ON public.groups USING btree (id);

CREATE UNIQUE INDEX group_users_group_id_idx ON public.group_users USING btree (group_id, user_id, role);

CREATE UNIQUE INDEX group_users_pkey ON public.group_users USING btree (id);

alter table "public"."group_users" add constraint "group_users_pkey" PRIMARY KEY using index "group_users_pkey";

alter table "public"."groups" add constraint "group_pkey" PRIMARY KEY using index "group_pkey";

alter table "public"."group_users" add constraint "group_users_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_users" validate constraint "group_users_group_id_fkey";

alter table "public"."group_users" add constraint "group_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."group_users" validate constraint "group_users_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_group_users()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$ BEGIN
DELETE from public.group_users
WHERE id = OLD.id;
RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_shop_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
Begin
If not jwt_is_group_member('158a70e3-64c0-49a5-b52f-37ed2b9b9b80') then
    IF new.verified <> old.verified or new.max_products <> old.max_products then
        RAISE EXCEPTION 'You are not allowed to update verified or max_products';
    END if;
End if;

update public.groups set name = new.name where id = new.id;

return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.jwt_has_group_role(group_id uuid, group_role text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE retval bool;
Begin
if jwt_is_expired() then raise exception 'invalid_jwt' USING HINT = 'JWT is expired or missing';
end if;
select coalesce(
    auth.jwt()->'app_metadata'->'groups'->group_id::text ? group_role,
    false
  ) into retval;
return retval;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.jwt_is_expired()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$ 
BEGIN 
IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
    return true;
ELSE
    return false;
END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.jwt_is_group_member(group_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE retval bool;
Begin
if jwt_is_expired() then raise exception 'invalid_jwt' USING HINT = 'JWT is expired or missing';
end if;
select coalesce(
    auth.jwt()->'app_metadata'->'groups' ? group_id::text,
    false
  ) into retval;
return retval;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_user_roles()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare 
_group_id uuid = coalesce(new.group_id, old.group_id);
_user_id uuid = coalesce(new.user_id, old.user_id);
begin
update auth.users
set raw_app_meta_data = jsonb_set(
    coalesce(raw_app_meta_data, '{}'::jsonb),
    '{"groups"}',
    jsonb_set(
      coalesce(raw_app_meta_data->'groups', '{}'::jsonb),
      array [_group_id::text],
      coalesce(
        (
          select jsonb_agg("role")
          from group_users gu
          where gu.group_id = _group_id
            and gu.user_id = _user_id
        ),
        '[]'::jsonb
      )
    )
  )
where id = _user_id;
return null;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_shop_create()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
Begin
insert into public.groups (id, name)
    values(new.id, new.name);

insert into public.group_users (group_id, user_id, role)
    values (
        new.id,
        new.owner_id,
        'owner'
    );

insert into storage.buckets (id, name, owner)
    values(
        new.id,
        new.id::text,
        new.owner_id
    );
return null;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_shop_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
Begin
delete from public.groups where id = old.id;

delete from storage.buckets where id = (old.id)::text;
return null;
end;
$function$
;

create policy "allow all actions for category_editors in group admin"
on "public"."attributes"
as permissive
for all
to authenticated
using (true)
with check (( SELECT jwt_has_group_role('158a70e3-64c0-49a5-b52f-37ed2b9b9b80'::uuid, 'category_editor'::text) AS jwt_has_group_role));


create policy "allow read for all users"
on "public"."attributes"
as permissive
for select
to anon
using (true);


create policy "allow all actions for category_editors in group admin"
on "public"."categories"
as permissive
for all
to authenticated
using (true)
with check (( SELECT jwt_has_group_role('158a70e3-64c0-49a5-b52f-37ed2b9b9b80'::uuid, 'category_editor'::text) AS jwt_has_group_role));


create policy "allow read for all users"
on "public"."categories"
as permissive
for select
to anon
using (true);


create policy "allow all actions for admin role of group admin"
on "public"."group_users"
as permissive
for all
to authenticated
using (( SELECT jwt_has_group_role('158a70e3-64c0-49a5-b52f-37ed2b9b9b80'::uuid, 'admin'::text) AS jwt_has_group_role))
with check (( SELECT jwt_has_group_role('158a70e3-64c0-49a5-b52f-37ed2b9b9b80'::uuid, 'admin'::text) AS jwt_has_group_role));


create policy "allow update on name column for shopowners"
on "public"."groups"
as permissive
for update
to authenticated
using (( SELECT (groups.id = ANY (ARRAY( SELECT (jsonb_object_keys(jsonb_array_elements(((auth.jwt() -> 'app_metadata'::text) -> 'groups'::text))))::uuid AS jsonb_object_keys)))))
with check (( SELECT (groups.id = ANY (ARRAY( SELECT (jsonb_object_keys(jsonb_array_elements(((auth.jwt() -> 'app_metadata'::text) -> 'groups'::text))))::uuid AS jsonb_object_keys)))));


create policy "allow all actions for shopowners on their products"
on "public"."products"
as permissive
for all
to authenticated
using (( SELECT jwt_has_group_role(products.shop_id, 'owner'::text) AS jwt_has_group_role))
with check ((( SELECT jwt_has_group_role(products.shop_id, 'owner'::text) AS jwt_has_group_role) AND ( SELECT (shops.product_count <= shops.max_products)
   FROM shops
  WHERE (shops.id = products.shop_id))));


create policy "allow read for all users on active products"
on "public"."products"
as permissive
for select
to anon
using (active);


create policy "allow delete for shopowners on their own shops"
on "public"."shops"
as permissive
for delete
to authenticated
using (( SELECT (auth.uid() = shops.owner_id)));


create policy "allow insert for users with less than 1 verified shop"
on "public"."shops"
as permissive
for insert
to authenticated
with check (( SELECT (count(*) < 1)
   FROM shops shops_1
  WHERE ((auth.uid() = shops_1.owner_id) AND (shops_1.verified = false))));


create policy "allow update for shopowners on their shops"
on "public"."shops"
as permissive
for update
to authenticated
using ((auth.uid() = owner_id))
with check ((auth.uid() = owner_id));


create policy "read access for all users on active, verified shops"
on "public"."shops"
as permissive
for select
to anon
using ((active AND verified));


create policy "read access for shopowners on their own shops"
on "public"."shops"
as permissive
for select
to authenticated
using ((auth.uid() = owner_id));


create policy "all access for users on their own data"
on "public"."users"
as permissive
for all
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));


CREATE TRIGGER on_change_update_user_metadata AFTER INSERT OR DELETE OR UPDATE ON public.group_users FOR EACH ROW EXECUTE FUNCTION update_user_roles();

CREATE TRIGGER on_shop_update BEFORE UPDATE ON public.shops FOR EACH ROW EXECUTE FUNCTION handle_shop_update();

CREATE TRIGGER on_shop_delete AFTER DELETE ON public.shops FOR EACH ROW EXECUTE FUNCTION handle_shop_delete();


create schema if not exists "tests";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION tests.authenticate_as(identifier text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
        DECLARE
                user_data json;
                original_auth_data text;
        BEGIN
            -- store the request.jwt.claims in a variable in case we need it
            original_auth_data := current_setting('request.jwt.claims', true);
            user_data := tests.get_supabase_user(identifier);

            if user_data is null OR user_data ->> 'id' IS NULL then
                RAISE EXCEPTION 'User with identifier % not found', identifier;
            end if;


            perform set_config('role', 'authenticated', true);
            perform set_config('request.jwt.claims', 
                json_build_object('sub', user_data ->> 'id', 
                'email', user_data ->> 'email', 
                'app_metadata', user_data -> 'raw_app_meta_data',
                'user_metadata', user_data -> 'raw_user_meta_data',
                'exp', extract(epoch from now()) + 1800)::text, 
            true);

        EXCEPTION
            -- revert back to original auth data
            WHEN OTHERS THEN
                set local role authenticated;
                set local "request.jwt.claims" to original_auth_data;
                RAISE;
        END
    $function$
;

CREATE OR REPLACE FUNCTION tests.clear_authentication()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    perform set_config('role', 'anon', true);
    perform set_config('request.jwt.claims', null, true);
END
$function$
;

CREATE OR REPLACE FUNCTION tests.create_supabase_user(identifier text, email text DEFAULT NULL::text, phone text DEFAULT NULL::text, metadata jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'auth', 'pg_temp'
AS $function$
DECLARE
    user_id uuid;
BEGIN

    -- create the user
    user_id := extensions.uuid_generate_v4();
    INSERT INTO auth.users (id, email, phone, raw_user_meta_data)
    VALUES (user_id, coalesce(email, concat(user_id, '@test.com')), phone, jsonb_build_object('test_identifier', identifier) || coalesce(metadata, '{}'::jsonb))
    RETURNING id INTO user_id;

    RETURN user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION tests.get_supabase_uid(identifier text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'auth', 'pg_temp'
AS $function$
DECLARE
    supabase_user uuid;
BEGIN
    SELECT id into supabase_user FROM auth.users WHERE raw_user_meta_data ->> 'test_identifier' = identifier limit 1;
    if supabase_user is null then
        RAISE EXCEPTION 'User with identifier % not found', identifier;
    end if;
    RETURN supabase_user;
END;
$function$
;

CREATE OR REPLACE FUNCTION tests.get_supabase_user(identifier text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'auth', 'pg_temp'
AS $function$
    DECLARE
        supabase_user json;
    BEGIN
        SELECT json_build_object('id', id, 'email', email, 'phone', phone, 'raw_user_meta_data', raw_user_meta_data, 'raw_app_meta_data', raw_app_meta_data) into supabase_user FROM auth.users WHERE raw_user_meta_data ->> 'test_identifier' = identifier limit 1;
        if supabase_user is null OR supabase_user -> 'id' IS NULL then
            RAISE EXCEPTION 'User with identifier % not found', identifier;
        end if;
        RETURN supabase_user;
    END;
$function$
;

CREATE OR REPLACE FUNCTION tests.rls_enabled(testing_schema text)
 RETURNS text
 LANGUAGE sql
AS $function$
    select is(
        (select
           	count(pc.relname)::integer
           from pg_class pc
           join pg_namespace pn on pn.oid = pc.relnamespace and pn.nspname = rls_enabled.testing_schema
           join pg_type pt on pt.oid = pc.reltype
           where relrowsecurity = FALSE)
        ,
        0,
        'All tables in the' || testing_schema || ' schema should have row level security enabled');
$function$
;

CREATE OR REPLACE FUNCTION tests.rls_enabled(testing_schema text, testing_table text)
 RETURNS text
 LANGUAGE sql
AS $function$
    select is(
        (select
           	count(*)::integer
           from pg_class pc
           join pg_namespace pn on pn.oid = pc.relnamespace and pn.nspname = rls_enabled.testing_schema and pc.relname = rls_enabled.testing_table
           join pg_type pt on pt.oid = pc.reltype
           where relrowsecurity = TRUE),
        1,
        testing_table || 'table in the' || testing_schema || ' schema should have row level security enabled'
    );
$function$
;


