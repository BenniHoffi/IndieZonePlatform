alter table "storage"."objects" drop constraint "objects_bucketId_fkey";

alter table "storage"."objects" add constraint "objects_bucket_id_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id) ON DELETE CASCADE not valid;

alter table "storage"."objects" validate constraint "objects_bucket_id_fkey";

create policy "allow all actions for shopowners on their bucket"
on "storage"."buckets"
as permissive
for all
to authenticated
using (( SELECT jwt_has_group_role((buckets.id)::uuid, 'owner'::text) AS jwt_has_group_role))
with check (( SELECT jwt_has_group_role((buckets.id)::uuid, 'owner'::text) AS jwt_has_group_role));


create policy "allow all actions for shopowners on their buckets objects"
on "storage"."objects"
as permissive
for all
to authenticated
using (( SELECT jwt_has_group_role((objects.bucket_id)::uuid, 'owner'::text) AS jwt_has_group_role))
with check (( SELECT jwt_has_group_role((objects.bucket_id)::uuid, 'owner'::text) AS jwt_has_group_role));



