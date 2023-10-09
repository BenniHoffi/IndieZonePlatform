create or replace function public.handle_shop_delete()
returns trigger
language plpgsql
security definer
as $function$
Begin
delete from public.groups where id = old.id;

delete from storage.buckets where id = (old.id)::text;
return null;
end;
$function$;

create trigger on_shop_delete
after delete on shops
for each row execute function handle_shop_delete();
