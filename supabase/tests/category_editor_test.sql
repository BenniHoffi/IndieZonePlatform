BEGIN;
SELECT plan(3);

select tests.create_supabase_user('test_category_editor');

insert into group_users (group_id, user_id, role) 
    values(
        '158a70e3-64c0-49a5-b52f-37ed2b9b9b80',
        tests.get_supabase_uid('test_category_editor'),
        'category_editor');

select tests.authenticate_as('test_category_editor');

select ok(jwt_has_group_role('158a70e3-64c0-49a5-b52f-37ed2b9b9b80', 'category_editor'), 
    'category_editor role is set');

select lives_ok($$ insert into public.attributes (id, name, type) 
    values (1, json_build_object('de', 'Seitenzahl', 'en', 'amount of pages'), 'Number') $$,
    'category_editor can insert into attributes');

select lives_ok($$ insert into public.categories (id, path, name, attributes) 
    values (1, '1', json_build_object('de', 'Kategorien', 'en', 'Categories'), array[1, 2]) $$,
    'category_editor can insert into categories');

SELECT * FROM finish();
ROLLBACK;
