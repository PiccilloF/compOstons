BEGIN;
SELECT
id,
category,
longitude,
latitude,
created_at,
updated_at
FROM compost
WHERE false;

SELECT id,firstname,lastname,username,mail,password,role,image,compost_id,created_at,updated_at 
FROM user_compost
WHERE false;


ROLLBACK;
