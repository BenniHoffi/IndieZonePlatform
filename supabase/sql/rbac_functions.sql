CREATE OR REPLACE FUNCTION public.has_group_role(group_id uuid, group_role text) RETURNS boolean LANGUAGE plpgsql AS $function$
DECLARE retval bool;
Begin
if jwt_is_expired() then raise exception 'invalid_jwt' USING HINT = 'JWT is expired or missing';
end if;
select coalesce(
    raw_app_meta_data->'groups'->group_id::text ? group_role,
    false
  )
from auth.users into retval
where id = auth.uid();
return retval;
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_group_member(group_id uuid) RETURNS boolean LANGUAGE plpgsql AS $function$
DECLARE retval bool;
Begin
if jwt_is_expired() then raise exception 'invalid_jwt' USING HINT = 'JWT is expired or missing';
end if;
select coalesce(
    raw_app_meta_data->'groups' ? group_id::text,
    false
  )
from auth.users into retval
where id = auth.uid();
return retval;
END;
$function$;

CREATE OR REPLACE FUNCTION public.jwt_has_group_role(group_id uuid, group_role text) RETURNS boolean LANGUAGE plpgsql AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.jwt_is_expired() RETURNS boolean LANGUAGE plpgsql AS $function$ 
BEGIN 
IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
    return true;
ELSE
    return false;
END IF;
END;
$function$;

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
$function$;