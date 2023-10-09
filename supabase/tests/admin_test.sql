BEGIN;
SELECT plan(5);

SELECT tests.create_supabase_user('test_admin');

insert into public.group_users (group_id, user_id, role)
    values (
        '158a70e3-64c0-49a5-b52f-37ed2b9b9b80',
        tests.get_supabase_uid('test_admin'),
        'admin');
        
select tests.authenticate_as('test_admin');

select ok(jwt_is_group_member('158a70e3-64c0-49a5-b52f-37ed2b9b9b80'), 'admin group is set');

select ok(jwt_has_group_role('158a70e3-64c0-49a5-b52f-37ed2b9b9b80', 'admin'), 'admin role is set');

select lives_ok($$ insert into public.group_users (group_id, user_id, role) 
    values ('158a70e3-64c0-49a5-b52f-37ed2b9b9b80', auth.uid(), 'group_editor') $$,
    'admin can insert into group_users');

select lives_ok($$ update public.group_users set role = 'category_editor' where user_id = auth.uid() and role = 'group_editor' $$,
    'admin can update group_users');

select lives_ok($$ delete from public.group_users where user_id = auth.uid() and role = 'category_editor' $$,
    'admin can delete from group_users');

SELECT * FROM finish();
ROLLBACK;

