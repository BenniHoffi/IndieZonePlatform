create or replace function public.handle_shop_update()
returns trigger
language plpgsql
as $function$
Begin
If not jwt_is_group_member('158a70e3-64c0-49a5-b52f-37ed2b9b9b80') then
    IF new.verified <> old.verified or new.max_products <> old.max_products then
        RAISE EXCEPTION 'You are not allowed to update verified or max_products';
    END if;
End if;

update public.groups set name = new.name where id = new.id;

return new;
end;
$function$;

create trigger on_shop_update
before update on shops
for each row execute function handle_shop_update();
