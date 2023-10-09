create or replace function public.handle_shop_create()
returns trigger
language plpgsql
security definer
as $function$
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
        new.name,
        new.owner_id
    );
return null;
end;
$function$;

create trigger on_shop_create 
after insert on shops
for each row execute function handle_shop_create();
