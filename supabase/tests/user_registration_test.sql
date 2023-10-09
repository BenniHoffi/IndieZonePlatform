BEGIN;
SELECT plan(1);

SELECT tests.create_supabase_user(
    'test_user', 
    'user@test.com', 
    '555-555-5555', 
    '{"name": "Max Mustermann", "username": "MaxiMusti93", "bday": "1998-04-22"}'::jsonb);

SELECT isnt_empty(
    $$ SELECT * FROM public.users WHERE id = tests.get_supabase_uid('test_user') $$,
    'trigger for user creation is working'
);

SELECT * FROM finish();
ROLLBACK;
