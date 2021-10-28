-- Revert compostons:data from pg

BEGIN;

DROP TABLE compost, user_compost;

COMMIT;
