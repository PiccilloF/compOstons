DROP DATABASE IF EXISTS d4a13ngnkt8jc6;

DROP ROLE IF EXISTS compostons;


CREATE ROLE compostons WITH LOGIN PASSWORD 'compostons';

GRANT all privileges ON ALL TABLES IN SCHEMA "public" to compostons; 

CREATE DATABASE d4a13ngnkt8jc6 WITH OWNER compostons; 

