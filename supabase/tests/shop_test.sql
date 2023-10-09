BEGIN;
SELECT plan(9);

select tests.create_supabase_user('test_shopowner');

select tests.authenticate_as('test_shopowner');

select lives_ok($$ insert into shops (name, zip_code, city, street_adress, country, shopowner_name, slogan) 
    values(
        'test shop',
        '12345',
        'test city',
        'test street 69',
        'test country',
        'test shopowner',
        'test slogan') $$);

select throws_ok($$ insert into shops (name, zip_code, city, street_adress, country, shopowner_name, slogan, verified) 
    values(
        'test shop',
        '12345',
        'test city',
        'test street 69',
        'test country',
        'test shopowner',
        'test slogan',
        true) $$, 
        '42501', 
        'new row violates row-level security policy for table "shops"');

select tests.authenticate_as('test_shopowner');

select ok(jwt_is_group_member((select id from shops where owner_id = auth.uid())), 
    'shopowner group is set');

select ok(jwt_has_group_role((select id from shops where owner_id = auth.uid()), 'owner'), 
    'shopowner is owner role');

select isnt_empty($$ select id from storage.buckets $$, 
    'shopowner has a bucket');

select lives_ok($$ update shops set active = true where owner_id = auth.uid() $$, 
    'shopowner can update shop');

select throws_ok($$ update shops set verified = true where owner_id = auth.uid() $$, 
    'P0001', 
    'You are not allowed to update verified or max_products');

select throws_ok($$ update shops set max_products = 1000 where owner_id = auth.uid() $$, 
    'P0001', 
    'You are not allowed to update verified or max_products');

select tests.clear_authentication();

select is_empty($$ select id from shops $$, 
    'anon cannot see shop');

SELECT * FROM finish();
ROLLBACK;
