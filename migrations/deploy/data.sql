BEGIN;

CREATE TABLE user_compost (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  firstname text,
  lastname text,
  username text,
  mail text NOT aucun,
  password text NOT aucun,
  role text NOT aucun,
  image text,
  created_at TIMESTAMPTZ NOT aucun DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT aucun DEFAULT NOW()
);

CREATE TABLE compost (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category text,
  longitude Float NOT aucun,
  latitude Float NOT aucun,
  user_id INT NOT aucun REFERENCES "user_compost"("id") ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT aucun DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT aucun DEFAULT NOW()
);
INSERT INTO
  compost ("category", "longitude", "latitude", "user_id")
VALUES


  ('vert', -0.5294, 44.8910, 2),
  ('marron', 1.5068, 45.5988, 3),
  ('aucun', 4.5677, 44.0930, 5),
  ('aucun', 2.4311, 47.4957, 7),
  ('marron', 3.3766, 47.1335, 11),
  ('tous types', 5.9855, 44.2942, 12),
  ('marron', 0.1913, 45.1239, 15),
  ('aucun', 6.6143, 46.8639, 16),
  ('tous types', 4.5277, 47.9695, 17),
  ('tous types', -0.7747, 45.9546, 19),
  ('marron', 1.8147, 45.9359, 20),
  ('aucun', -0.4702, 44.3908, 21),
  ('tous types', 4.4120, 45.9781, 22),
  ('aucun', 1.1669, 44.9349, 24),
  ('tous types', 0.5558, 45.1461, 25),
  ('marron', 3.0094, 46.1209, 26),
  ('aucun', 5.8984, 46.5214, 27),
  ('aucun', 1.5486, 45.9193, 28),
  ('tous types', 3.9988, 44.7545, 29),
  ('aucun', -0.1596, 44.9392, 30),
  ('aucun', 4.0066, 46.0666, 32),
  ('marron', 3.2399, 47.6857, 33),
  ('vert', 3.7522, 44.7273, 39),
  ('aucun', 6.1003, 47.3980, 42),
  ('aucun', 5.5231, 47.5899, 43),
  ('vert', 3.4201, 45.7304, 46),
  ('marron', -0.4367, 44.2684, 47),
  ('marron', 1.6396, 45.7806, 48),
  ('tous types', -0.3535, 46.5351, 49),
  ('vert', 5.7192, 44.2129, 50),
  ('aucun', 1.0778, 44.9178, 52),
  ('vert', 4.0871, 44.3365, 59),
  ('aucun', 5.6331, 47.1880, 61),
  ('marron', 1.1270, 45.2839, 67),
  ('vert', 3.4558, 46.5690, 68),
  ('marron', 1.1823, 47.5221, 69),
  ('marron', 3.0171, 46.1103, 70),
  ('marron', 4.5199, 45.1702, 71),
  ('marron', 2.7659, 44.1301, 75),
  ('aucun', 3.8432, 44.9637, 76),
  ('tous types', 5.8490, 45.7044, 77),
  ('vert', 1.8650, 45.0403, 79),
  ('aucun', 3.3633, 44.1407, 80),
  ('tous types', 2.0515, 44.4815, 81),
  ('marron', 1.1708, 46.1115, 83),
  ('marron', 6.7656, 45.5988, 84),
  ('vert', -0.3158, 46.7930, 85),
  ('tous types', 2.1349, 44.3531, 93),
  ('tous types', 3.0156, 44.3044, 98),
  ('marron', -0.8885, 45.6899, 99),
  ('aucun', -0.9035, 44.3566, 100)
  
INSERT INTO
  user_compost (
    "firstname",
    "lastname",
    "username",
    "mail",
    "password",
    "role",
    "image",
   
  )
VALUES
  (
    'Martial',
    'Meunier',
    'Pierrick73',
    'Childebert87@gmail.com',
    'CAwT4JCFa1fAGFU',
    'chercheur',
    'http://placeimg.com/640/480/food'
    
  ),
  (
    'Médéric',
    'Vincent',
    'Hélier.Baron24',
    'Amalthe.Perrot@yahoo.fr',
    'cDGM4ueSqm2jxzM',
    'proposeur',
    'http://placeimg.com/640/480/abstract'
    
  ),
  (
    'Théodose',
    'Francois',
    'Cléandre_Perrin13',
    'Angilran6@gmail.com',
    'VMopjSNbqvBqi0z',
    'proposeur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Aquilin',
    'Adam',
    'Chrysole_Schmitt',
    'Mence48@yahoo.fr',
    'C1y5O0lwXPcxZp6',
    'chercheur',
    'http://placeimg.com/640/480/business'
    
  ),
  (
    'Yseult',
    'Leroux',
    'Corentine42',
    'Garnier.Rodriguez@yahoo.fr',
    'uNm0RoLysD6eO7C',
    'proposeur',
    'http://placeimg.com/640/480/abstract'
    
  ),
  (
    'Sophie',
    'Fabre',
    'Mélisande.Huet39',
    'Fabrice_Picard@yahoo.fr',
    'jLxBaoc0_FKrjim',
    'chercheur',
    'http://placeimg.com/640/480/sports'
    
  ),
  (
    'Caroline',
    'Carre',
    'Amaryllis98',
    'Basilisse_Roy66@gmail.com',
    'oGRVzjAn7__yR1L',
    'proposeur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Aubry',
    'Dupont',
    'Léa_Blanchard',
    'Serge.Berger35@gmail.com',
    '_GghvA8cc4cxcbw',
    'chercheur',
    'http://placeimg.com/640/480/cats'
    
  ),
  (
    'Anatolie',
    'Marty',
    'Lionel38',
    'meric.Aubry@hotmail.fr',
    'K1ZPqwUdyqvhToE',
    'chercheur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Tanguy',
    'Laurent',
    'Caroline_Martin',
    'Amiel22@hotmail.fr',
    'hZGGzyZK3fXwpI9',
    'chercheur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Gautier',
    'Guyot',
    'Antonine.Bourgeois70',
    'Marion36@hotmail.fr',
    'Nf_exsfOK9ZhNtb',
    'proposeur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Jonathan',
    'Vasseur',
    'Odile.Arnaud13',
    'Albrade_Robin@yahoo.fr',
    '48X_vj7Tpc5yBee',
    'proposeur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Adalard',
    'Sanchez',
    'Aubertine.Clement0',
    'Lionel60@hotmail.fr',
    'XpaJnJll7LbbJCj',
    'chercheur',
    'http://placeimg.com/640/480/cats'
    
  ),
  (
    'Athalie',
    'Paul',
    'Ludolphe16',
    'Girart.Muller14@hotmail.fr',
    'zYSffq0zKTr7FUr',
    'chercheur',
    'http://placeimg.com/640/480/business'
    
  ),
  (
    'Agathe',
    'Meunier',
    'Judicaël_Fournier46',
    'Rmi65@gmail.com',
    'RyhzZEgON8nqKtL',
    'proposeur',
    'http://placeimg.com/640/480/transport'
    
  ),
  (
    'Eugénie',
    'Simon',
    'Léonard75',
    'Jourdain_Dufour@yahoo.fr',
    'aioKt_zYLm6fSTz',
    'proposeur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Aliénor',
    'Rolland',
    'Anicet66',
    'Roger.Mathieu22@yahoo.fr',
    'FpkLlLqOaee92xc',
    'proposeur',
    'http://placeimg.com/640/480/animals'
    
  ),
  (
    'Olympe',
    'Berger',
    'Damien.Marie99',
    'Amarande73@yahoo.fr',
    'sMeDnHtRwOAzutB',
    'chercheur',
    'http://placeimg.com/640/480/food'
    
  ),
  (
    'Césaire',
    'Masson',
    'Astrée.Paris',
    'Gisle25@hotmail.fr',
    'obyQQHjqRshWpl0',
    'proposeur',
    'http://placeimg.com/640/480/nature'
    
  ),
  (
    'Amante',
    'Gautier',
    'Xénophon0',
    'Amiel_Mathieu78@yahoo.fr',
    'EYk3IGpuTVjWVaL',
    'proposeur',
    'http://placeimg.com/640/480/nightlife'
    
  ),
  (
    'Anastase',
    'Morel',
    'Andrée.Giraud',
    'Abdonie97@gmail.com',
    'icU30K3nec95me6',
    'proposeur',
    'http://placeimg.com/640/480/animals'
    
  ),
  (
    'Alexanne',
    'Arnaud',
    'Jeanned’Arc_Royer',
    'Ren71@yahoo.fr',
    'MqB9B7L307PE29J',
    'proposeur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Élisabeth',
    'Clement',
    'Annibal.Francois65',
    'Nol.Bourgeois@gmail.com',
    'Ex78BF5U9Gsy63z',
    'chercheur',
    'http://placeimg.com/640/480/abstract'
    
  ),
  (
    'Césaire',
    'Marchand',
    'Oriande.Lucas1',
    'Mahaut.Philippe@gmail.com',
    '1yosbyOcgbW4kT2',
    'proposeur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Arsinoé',
    'Renard',
    'Marie46',
    'Jacinthe.Carpentier@hotmail.fr',
    'wV9RoNxDODLc9JF',
    'proposeur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Yoann',
    'Marty',
    'Olivier91',
    'Hermine.Picard@yahoo.fr',
    '9glEocB1ktKdh30',
    'proposeur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Marcelin',
    'Perrin',
    'Priscille.Petit68',
    'Jehanne.Roussel48@hotmail.fr',
    'AqZYH3who3Oozg2',
    'proposeur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Rachel',
    'Poirier',
    'Dorian42',
    'Achaire67@gmail.com',
    'mtVHnLUTsyG4s4r',
    'proposeur',
    'http://placeimg.com/640/480/animals'
    
  ),
  (
    'Étienne',
    'Leclercq',
    'Émérance10',
    'Blanche.Berger@hotmail.fr',
    'QkPhrOs0yZ4gjFX',
    'proposeur',
    'http://placeimg.com/640/480/abstract'
    
  ),
  (
    'Balthazar',
    'Jacquet',
    'Innocent51',
    'Lonne_Paul72@hotmail.fr',
    'pLt2gPjjFbkhlX_',
    'proposeur',
    'http://placeimg.com/640/480/business'
    
  ),
  (
    'Laurent',
    'Vasseur',
    'Yvonne.Marchal',
    'Albane.Andre@hotmail.fr',
    'Ijuy0icXfT3eKSf',
    'chercheur',
    'http://placeimg.com/640/480/sports'
    
  ),
  (
    'Tatiana',
    'Maillard',
    'Léandre_Brunet19',
    'Anastasie.Benoit37@gmail.com',
    'QS0a2sk8uYiEAlR',
    'proposeur',
    'http://placeimg.com/640/480/nature'
    
  ),
  (
    'Aliette',
    'Nguyen',
    'Anémone.Perez',
    'Azale.Richard@yahoo.fr',
    'ye22LkWiDo7qrDS',
    'proposeur',
    'http://placeimg.com/640/480/nature'
    
  ),
  (
    'Janine',
    'Nguyen',
    'Félix.Marchand',
    'Maxence.Lambert30@hotmail.fr',
    'eWUKh3HMTWeIzWi',
    'chercheur',
    'http://placeimg.com/640/480/sports'
    
  ),
  (
    'Armande',
    'Louis',
    'Joachim.Collet63',
    'Arthaud_Andre@gmail.com',
    'sMTv_wzW0gkafs8',
    'chercheur',
    'http://placeimg.com/640/480/nature'
    
  ),
  (
    'Venance',
    'Duval',
    'Célestin.Fernandez',
    'Muriel.Garnier@gmail.com',
    '0GHMf3jWW_WkHbL',
    'chercheur',
    'http://placeimg.com/640/480/nightlife'
    
  ),
  (
    'Mélanie',
    'Picard',
    'Clémentine_Adam',
    'Clara_Blanc@yahoo.fr',
    'RjCMgMpPYdGff1L',
    'chercheur',
    'http://placeimg.com/640/480/transport'
    
  ),
  (
    'Josse',
    'Perrot',
    'Armel.Fleury',
    'Loc.Barre95@gmail.com',
    'IxJhhkN35xkOYYc',
    'chercheur',
    'http://placeimg.com/640/480/business'
    
  ),
  (
    'Mauricette',
    'Barbier',
    'Charlotte_Lefebvre49',
    'Oury.Muller@gmail.com',
    'lTqA9ErfMBpYj1X',
    'proposeur',
    'http://placeimg.com/640/480/sports'
    
  ),
  (
    'Francine',
    'Guillaume',
    'Luc98',
    'Bouchard.Jacquet34@yahoo.fr',
    '22CAnelTb5OvhcV',
    'chercheur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Jocelyn',
    'Barbier',
    'Cédric.Nguyen',
    'Carloman.Meunier@hotmail.fr',
    'V9xFWTALoLkwujU',
    'chercheur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Gerbert',
    'Leroux',
    'Martin50',
    'Adalbaude80@gmail.com',
    'lXTEfx41ojT8XQs',
    'proposeur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Roch',
    'Garcia',
    'Jérôme.Fernandez66',
    'Chrtien_Morin@yahoo.fr',
    'EwqlPar02Kuqw4f',
    'proposeur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Sidoine',
    'Colin',
    'Alexis.Benoit',
    'Armandine57@gmail.com',
    'tWk40jpG9FWZjuO',
    'chercheur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Absalon',
    'Lambert',
    'Artémis_Thomas98',
    'Janine.Rolland@gmail.com',
    's91emew3L2xMBZ2',
    'chercheur',
    'http://placeimg.com/640/480/transport'
    
  ),
  (
    'Laurent',
    'Roux',
    'Camillien_Marie',
    'Albric.Masson@hotmail.fr',
    'QMeFCnfVp1SOluG',
    'proposeur',
    'http://placeimg.com/640/480/abstract'
    
  ),
  (
    'Tiphaine',
    'Gauthier',
    'Ansbert_Fontaine',
    'Pacme96@yahoo.fr',
    'dr4_o2wzzdFaWig',
    'proposeur',
    'http://placeimg.com/640/480/cats'
    
  ),
  (
    'Gaud',
    'Sanchez',
    'Célestin_Brun45',
    'Armine_Julien@hotmail.fr',
    'iGwap9urzfANWa1',
    'proposeur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Paule',
    'Gaillard',
    'Aurélienne40',
    'Flavie_Noel@hotmail.fr',
    '2QiAgWEHKYtXhs6',
    'proposeur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Oger',
    'Dumas',
    'Dorian4',
    'lise_Brun55@hotmail.fr',
    'UBlthKh6Tik4_nF',
    'proposeur',
    'http://placeimg.com/640/480/abstract'
    
  ),
  (
    'Mélodie',
    'Aubry',
    'Pénélope11',
    'Isabeau69@gmail.com',
    '13jrLG0Ppgn8uwm',
    'chercheur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Ursule',
    'Rey',
    'Adegrine63',
    'Rosalie79@gmail.com',
    'X1g70FW_BzpBODu',
    'proposeur',
    'http://placeimg.com/640/480/nature'
    
  ),
  (
    'Antigone',
    'Morin',
    'Adalbéron.Rodriguez96',
    'Asceline.Legtous types@hotmail.fr',
    'jMJ3vLS2tTlkhAe',
    'chercheur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Aube',
    'Boyer',
    'Odette11',
    'Alas_Maillard24@gmail.com',
    'LD3BQW9ehQCZjnt',
    'chercheur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Corinne',
    'Philippe',
    'Gonthier6',
    'Elsa69@yahoo.fr',
    'efJjAYYmHp4EoI8',
    'chercheur',
    'http://placeimg.com/640/480/food'
    
  ),
  (
    'Quentine',
    'Legrand',
    'Félicité.Julien35',
    'lose90@yahoo.fr',
    '3zCRSwFbMpODJLG',
    'chercheur',
    'http://placeimg.com/640/480/animals'
    
  ),
  (
    'Hildebert',
    'Paris',
    'Emmelie54',
    'Alberte.Marie@hotmail.fr',
    'LDszktwaCAPRIIt',
    'chercheur',
    'http://placeimg.com/640/480/fashion'
    
  ),
  (
    'Eustache',
    'Adam',
    'Jeanned’Arc81',
    'Arian_Rolland67@hotmail.fr',
    'yDIbZX2vXmUB2IK',
    'chercheur',
    'http://placeimg.com/640/480/cats'
    
  ),
  (
    'Arthème',
    'Michel',
    'Andrée.Berger81',
    'Laurence10@gmail.com',
    'qSJ1YO49N9F3IKM',
    'proposeur',
    'http://placeimg.com/640/480/sports'
    
  ),
  (
    'Lazare',
    'Lecomte',
    'Michaël_Bernard58',
    'Gdon.Leclerc@gmail.com',
    'm633Zel0lyXLaCy',
    'chercheur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Paul',
    'Renaud',
    'Pascale95',
    'Acace34@gmail.com',
    'rqK6GyZ9I4ClMBs',
    'proposeur',
    'http://placeimg.com/640/480/business'
    
  ),
  (
    'Hédelin',
    'Deschamps',
    'Guillaume.Dubois98',
    'Paulette_Pierre@hotmail.fr',
    'Gw8eM9id0KTkMM0',
    'chercheur',
    'http://placeimg.com/640/480/nightlife'
    
  ),
  (
    'Renée',
    'Barbier',
    'Annabelle.Vasseur71',
    'Firmin1@hotmail.fr',
    'cBnHXQc1sMlahkT',
    'chercheur',
    'http://placeimg.com/640/480/transport'
    
  ),
  (
    'Noëlle',
    'Perrot',
    'Constance.Gerard',
    'Orlane.Duval30@yahoo.fr',
    '6imQU1VuVofxJHq',
    'chercheur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Trajan',
    'Francois',
    'Aloïs.Robin',
    'Octave.Remy47@gmail.com',
    'wMu0husq9WiWh_A',
    'chercheur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Adélie',
    'Legrand',
    'Alban87',
    'Hilaire_Berger@hotmail.fr',
    'A86joeJsUqKeTtk',
    'chercheur',
    'http://placeimg.com/640/480/transport'
    
  ),
  (
    'Audeline',
    'Robin',
    'Aurélienne.Laine',
    'Raphal_Francois5@yahoo.fr',
    'RDgQ5lNU6kcCOL6',
    'proposeur',
    'http://placeimg.com/640/480/nature'
    
  ),
  (
    'Cécile',
    'Brun',
    'Norbert23',
    'Hildebert_Paris77@gmail.com',
    'E5flUQFcBgwQUUi',
    'proposeur',
    'http://placeimg.com/640/480/transport'
    
  ),
  (
    'Carloman',
    'Simon',
    'Patrice_Leroux76',
    'Jason84@yahoo.fr',
    'RuJ2MrsnMqKLi0M',
    'proposeur',
    'http://placeimg.com/640/480/food'
    
  ),
  (
    'Anastasie',
    'Leclercq',
    'Amandin_Marchal',
    'Audran.Lopez@yahoo.fr',
    '79eu9D7GxOwL3yH',
    'proposeur',
    'http://placeimg.com/640/480/nightlife'
    
  ),
  (
    'Angilberte',
    'Picard',
    'Julie71',
    'Zo56@hotmail.fr',
    'S77pE8JqVk_Cm1j',
    'proposeur',
    'http://placeimg.com/640/480/nature'
    
  ),
  (
    'Clotilde',
    'Lefebvre',
    'Jean30',
    'Maureen_Gaillard58@gmail.com',
    '6ts0H0ntg_E4TcZ',
    'chercheur',
    'http://placeimg.com/640/480/food'
    
  ),
  (
    'Brieuc',
    'Baron',
    'Laure89',
    'Lorrain_Muller10@yahoo.fr',
    'Aj2p1erVFWnonES',
    'chercheur',
    'http://placeimg.com/640/480/animals'
    
  ),
  (
    'Briac',
    'Roussel',
    'Auxane.Nicolas',
    'Aurore39@yahoo.fr',
    'Lcg1mtl7qWTi9jO',
    'chercheur',
    'http://placeimg.com/640/480/nightlife'
    
  ),
  (
    'Pétronille',
    'Leclercq',
    'Jourdain31',
    'Arthaud.Denis@gmail.com',
    '6UUXSDOOuMa1OFf',
    'proposeur',
    'http://placeimg.com/640/480/fashion'
    
  ),
  (
    'Épiphane',
    'Leclerc',
    'Valentine.Marchal',
    'Isidore_Morin@hotmail.fr',
    'JwfaglIR13Z4xgA',
    'proposeur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Venance',
    'Le gtous types',
    'Auguste.Gonzalez',
    'Bernadette.Lecomte@gmail.com',
    'YUL5GnwbaUHt2kD',
    'proposeur',
    'http://placeimg.com/640/480/nature'
    
  ),
  (
    'Lionel',
    'Berger',
    'Philomène.Clement38',
    'Adeltrude11@yahoo.fr',
    'xLs1E9S975D1Hbw',
    'chercheur',
    'http://placeimg.com/640/480/business'
    
  ),
  (
    'Michèle',
    'Guyot',
    'Christian73',
    'Astrie_Breton14@gmail.com',
    'O0z8GIddK9PAkQY',
    'proposeur',
    'http://placeimg.com/640/480/business'
    
  ),
  (
    'Frédéric',
    'Fontaine',
    'Abelin.Rey',
    'Arcade68@yahoo.fr',
    'ps0BT0wKA85VIBu',
    'proposeur',
    'http://placeimg.com/640/480/food'
    
  ),
  (
    'Eustache',
    'Remy',
    'Éric_Joly18',
    'Paterne67@yahoo.fr',
    'ny7gXCxqhwUJ7oe',
    'proposeur',
    'http://placeimg.com/640/480/sports'
    
  ),
  (
    'Herluin',
    'Guillot',
    'Lazare.Brunet',
    'Adegrine.Legtous types68@gmail.com',
    'I2SkCiSbp5HdUJf',
    'chercheur',
    'http://placeimg.com/640/480/transport'
    
  ),
  (
    'Ozanne',
    'Lecomte',
    'Fortunée19',
    'Turold.Schmitt73@hotmail.fr',
    'uHOcCLXGmevD7kK',
    'proposeur',
    'http://placeimg.com/640/480/city'
    
  ),
  (
    'Stanislas',
    'Carre',
    'Maureen.Marchand16',
    'Rosalie.Duval@hotmail.fr',
    'v92Czo814eiC9uM',
    'proposeur',
    'http://placeimg.com/640/480/transport'
    
  ),
  (
    'Artémis',
    'Lefebvre',
    'Balthazar.Martinez',
    'Damien.Blanc@hotmail.fr',
    'bG_jLvmqj8bUYwp',
    'proposeur',
    'http://placeimg.com/640/480/business'
    
  ),
  (
    'Alphonsine',
    'Lacroix',
    'Élzéar47',
    'Sverin.Richard82@hotmail.fr',
    'iBwIrfid69Zh9sX',
    'chercheur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Laurane',
    'Huet',
    'Audebert43',
    'Maureen_Garcia@yahoo.fr',
    'XjIh5CLoMZiHb79',
    'chercheur',
    'http://placeimg.com/640/480/sports'
    
  ),
  (
    'Joseph',
    'Barre',
    'Fabien.Menard',
    'Mlodie.Barbier20@gmail.com',
    '_hCPy_dtX7rNbpU',
    'chercheur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Émeline',
    'Richard',
    'Alice18',
    'Parfait_Fournier@gmail.com',
    'iacH01NfNB04_Vc',
    'chercheur',
    'http://placeimg.com/640/480/abstract'
    
  ),
  (
    'René',
    'Moulin',
    'Fidèle76',
    'Swassane_Cousin48@hotmail.fr',
    '1dE1DAl_0bvzhcu',
    'chercheur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Daniel',
    'Guyot',
    'Abigaïl1',
    'Claudien_Richard@gmail.com',
    '3COidV5Rtw04e4z',
    'chercheur',
    'http://placeimg.com/640/480/business'
    
  ),
  (
    'Capucine',
    'Le gtous types',
    'Eudoxie.Giraud',
    'Olive.Noel@yahoo.fr',
    'tYjaFV3UwxzMTjp',
    'chercheur',
    'http://placeimg.com/640/480/nightlife'
    
  ),
  (
    'Pierre',
    'Fernandez',
    'Axelle_Bourgeois',
    'Mireille48@yahoo.fr',
    'gaBvBM_1599936v',
    'proposeur',
    'http://placeimg.com/640/480/abstract'
    
  ),
  (
    'Alverède',
    'Baron',
    'Gérard_Arnaud',
    'Eugnie22@hotmail.fr',
    '9GpGL5IWsLy3PsJ',
    'chercheur',
    'http://placeimg.com/640/480/abstract'
    
  ),
  (
    'Reybaud',
    'Gaillard',
    'Longin24',
    'Henri_Picard@hotmail.fr',
    'GPIAUT5X4Ct92J3',
    'chercheur',
    'http://placeimg.com/640/480/technics'
    
  ),
  (
    'Xavière',
    'Marchal',
    'Léon18',
    'Lonie.Blanchard@hotmail.fr',
    'DatZeFLLRBGtkn6',
    'chercheur',
    'http://placeimg.com/640/480/nightlife'
    
  ),
  (
    'Nadine',
    'Fontaine',
    'Pie_Paris',
    'Ernestine.Simon89@gmail.com',
    'oV527FFBkRi2e1Z',
    'chercheur',
    'http://placeimg.com/640/480/nightlife'
    
  ),
  (
    'Jonathan',
    'Michel',
    'Ambre22',
    'Lonard_Meunier87@hotmail.fr',
    'UzN2Cyyw6r8_vPu',
    'proposeur',
    'http://placeimg.com/640/480/people'
    
  ),
  (
    'Iris',
    'Joly',
    'Apolline_Fontaine80',
    'Aldric.Pierre@yahoo.fr',
    'ifmbd3ojmzezBbH',
    'proposeur',
    'http://placeimg.com/640/480/fashion'
    
  ),
  (
    'Adonis',
    'Dumas',
    'Cléry_Giraud',
    'Alexine_Lacroix9@yahoo.fr',
    'ubxrkv3j6bF72DS',
    'proposeur',
    'http://placeimg.com/640/480/city'
    
  );
COMMIT;