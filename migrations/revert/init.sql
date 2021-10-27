-- Revert compostons:init from pg

BEGIN;

DROP TABLE compost, user_compost;

COMMIT;
