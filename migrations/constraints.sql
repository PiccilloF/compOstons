
-- DOMAIN
CREATE DOMAIN mail AS text CHECK(VALUE ~ '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+$')

ALTER TABLE user_compost ALTER COLUMN mail TYPE mail;

-- FUNCTION 
CREATE FUNCTION update_compost(json, int) RETURNS void  AS $$
	UPDATE compost 	SET 	category=$1->>'category',
							longitude=($1->>'longitude')::float,
							latitude=($1->>'latitude')::float 
					WHERE 	id=$2;
$$ LANGUAGE sql STRICT SECURITY DEFINER;

-- //////////////////////////////////////////////////////

CREATE FUNCTION create_user (json) RETURNS int  AS $$
	INSERT INTO user_compost (firstname, lastname, username, mail, password, role, image) VALUES (
		$1->>'firstname',
		$1->>'lastname',
		$1->>'username',
		$1->>'mail',
		$1->>'password',
		$1->>'role',
		$1->>'image'
	) RETURNING id;
	$$ LANGUAGE sql STRICT SECURITY DEFINER;




CREATE OR REPLACE FUNCTION update_info (json, integer) RETURNS void  AS $$
	UPDATE user_compost SET 				firstname=$1->>'firstname', 
											lastname=$1->>'lastname', 
											username=$1->>'username',
											mail=$1->>'mail',
											password=$1->>'password',
											role=$1->>'role',
											image=$1->>'image'
										WHERE   id=$2;
	UPDATE compost SET 						longitude=($1->>'longitude')::float,
											latitude=($1->>'latitude')::float,
											category=$1->>'category',
											address=$1->>'address'
										WHERE compost.user_id=$2;
										
									
	$$ LANGUAGE sql STRICT SECURITY DEFINER;
	


-- VIEWS
CREATE VIEW porposeur AS 
	SELECT compost.id, category, longitude, latitude, user_id, username 
		FROM compost  
		JOIN user_compost ON compost.user_id = user_compost.id

SELECT * FROM porposeur;


 CREATE VIEW compostAndUserInfo AS 
 SELECT user_compost.id, firstname, lastname, username, mail, password, role, image, longitude, latitude, category
 FROM user_compost  JOIN compost on user_compost.id = compost.user_id; 


-- CONSTRAINT

ALTER TABLE user_compost ADD CONSTRAINT username_constraint UNIQUE ("username")
ALTER TABLE user_compost ADD CONSTRAINT mail_constraint UNIQUE ("mail")