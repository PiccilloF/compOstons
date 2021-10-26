# MLD
User(<ins>id</ins>, firstname, lastname, username, mail, password, role, image, longitude, latitude, address, locality, Zip code, user_id)
Compost(<ins>code_compost</ins>, category, status, user_id)



# dictionnaire de données

## table USER

|champ|type|spécificités|description|
|---|---|---|---|
|ID|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT|id de l'adresse|
|fistname|VARCHAR(56)||prenom|
|lastname|VARCHAR(56)||nom|
|username|VARCHAR(56)|NOT NULL|nom|
|mail|VARCHAR(128)|NOT NULL|mail|
|password|VARCHAR(255)|NOT NULL|mot de passe|
|role|VARCHAR(56)|NOT NULL||
|image|VARCHAR(128)|NOT NULL|image de profil / avatar|
|longitude|Float||coordonnées gps longitude|
|latitude|Float||coordonnées gps latitude|
|address|VARCHAR(255)||adresse|
|locality|VARCHAR(255)||nom de la ville|
|zip code|INT|NOT NULL|code postal 5 chiffres (voir pour DOM TOM)|
|user_id|INT|NOT NULL|FK numero de l'utilisateur|
|created_at| TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP| 	La date de création de la personne|
|updated_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP| 	La date de dernière modification de la personne|


## table Compost


|champ|type|spécificités|description|
|---|---|---|---|
|code_compost|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT|id du compost|
|category|VARCHAR(56)|NOT NULL|type de compost|
|status|BOLEAN|NOT NULL|disponibilité du point de compostage|





