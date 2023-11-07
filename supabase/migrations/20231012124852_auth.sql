alter table "auth"."saml_relay_states" drop constraint "saml_relay_states_flow_state_id_fkey";

drop index if exists "auth"."mfa_factors_user_id_idx";

alter table "auth"."saml_relay_states" drop column "flow_state_id";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION auth.handle_user_create()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$ begin
  insert into public.users (id, name, username, bday, email)
  values (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'username', (new.raw_user_meta_data->>'bday')::date, new.email);
  return new;
end;
$function$
;

CREATE TRIGGER on_user_create AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION auth.handle_user_create();


