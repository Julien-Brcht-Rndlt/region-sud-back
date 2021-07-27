#------------------------------------------------------------
# Table: Theme
#------------------------------------------------------------

INSERT INTO theme( title, icon) VALUES 
('Thème 1 : Valorisation des déchets', 'theme1.png'),
("Thème 2 : Sensibilisation à l'écoresponsabilité", 'theme2.png'),
("Thème 3 : Consommation d'eau", 'theme3.png'),
('Thème 4 : Consommation électrique', 'theme4.png');


#------------------------------------------------------------
# Table: question
#------------------------------------------------------------

#Theme #1
INSERT INTO question( title, id_theme) VALUES 
('Avez-vous mis en place une démarche de réduction des déchets ?', 1),
('Avez-vous mis en place une démarche de tri sélectif des déchets (verre, emballage et papier) ?', 1),
("Avez-vous mis en place une démarche de collecte et traitement d'autres déchets ?", 1),
('Avez-vous mis en place des actions de valorisation et gestion des déchets sportifs ?', 1),
('Proposez vous une restauration sur place ?', 1);

#Theme #2
INSERT INTO question( title, id_theme) VALUES
('Allez-vous accueillir du public ?', 2),
("Avez-vous mis en place une campagne d'informations grand public dédiée sur site ?", 2),
("Proposez vous des actions de formation et/ou sensibilisation en direction des personnels d'organisation et des participants ?", 2);

#Theme #3
INSERT INTO question( title, id_theme) VALUES
("Indiquez la quantité d'eau potable en Litre qui est consommée pendant la manifestation:", 3),
("Avez-vous mis en place des solutions de réduction de la consommation d'eau ?", 3),
('Avez-vous mis en place un système de récupération des eaux de pluie ?', 3);

#Theme #4
INSERT INTO question( title, id_theme) VALUES
("Indiquez la quantité estimée d'électricité en kWh qui est consommée pendant la manifestation:", 4),
("Avez-vous mis en place des systèmes d'énergies renouvelables ?", 4),
('Avez-vous mis en place des solutions de réduction de consommation électrique ?', 4),
('êtes-vous autonome en production électrique avec des solutions renouvelables ?', 4);

Le reste des Thèmes
('Avez-vous mis en place des dispositifs de sensibilisation aux écosystèmes fragiles ?') ,
('Quelles est la distance moyenne entre le domicile de vos participants et le lieu de la manifestation ?') ,
('Quels est le mode de déplacement privilégiés des équipages ?') ,
('utilisez vous des embarcations écoconçues ?',) ,
('Quels sont les types de motorisations des embarcations ?') ,
('Combien de bateaux à moteurs sont utilisés sur l'ensemble de votre événement ?') ,
('Utilisez vous des produits d'entretien des bateaux biodégradables ?') ,
('Le port de plaisance d'où partent les bateaux est-il certifié "ports propres" ?') ,
('La base nautique est-elle basse consommation (R12) ?') ,

#------------------------------------------------------------
# Answer_type
#------------------------------------------------------------

INSERT INTO answer_type(title) VALUES ('INPUT_ANSWER'); 
INSERT INTO answer_type(title) VALUES ('ONE_CHOICE'); 
INSERT INTO answer_type(title) VALUES ('MULTIPLE_CHOICE');
INSERT INTO answer_type(title) VALUES ('NO_CHOICE');


#------------------------------------------------------------
# Table: answer
#------------------------------------------------------------

#Question 1 Theme 1
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Dispositif zéro bouteilles plastiques', 1, 1, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Emballages écoresponsables', 1, 1, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 1, 4 );

#Question 2 Theme 1
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Oui', 1, 2, 2);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 2, 2);

#Question 3 Theme 1
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Mégots', 1, 3, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Biodéchets/Compost', 1, 3, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Capsules de café/thé', 1, 3, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Stickers', 1, 3, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Gourdes', 1, 3, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 3, 4);

#Question 4 Theme 1
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Oui', 1, 4, 2);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 4, 2);

#Question 5 Theme 1
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Local/circuits courts', 1, 5, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('BIO', 1, 5, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Couverts biodégradables ou durables', 1, 5, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Doggy bag', 1, 5, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Consigne de vaisselles ou de bouteilles', 1, 5, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 5, 4);

#Question 1 Theme 2
INSERT INTO answer( title, weight, id_question, id_answer_type) VALUES ('Oui', 1, 6, 2);
INSERT INTO answer( title, weight, id_question, id_answer_type) VALUES ('Non', 0, 6, 2);

#Question 2 Theme 2
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Actions de sensibilisation sur site via une association spécialisée', 1, 7, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ("Panneaux d'affichage informatifs", 1, 7, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Traduction des panneaux informatifs en anglais', 1, 7, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Jeux concours', 1, 7, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Réseaux sociaux', 1, 7, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 7, 4);

#Question 3 Theme 2
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Oui', 1, 8, 2);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 8, 2);

#Question 1 Theme 3
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ("Litres d'eau potable consommés", 0, 9, 1);

#Question 2 Theme 3
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Réducteur de débit extérieur (type tuyaux de rinçage)', 1, 10, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Réducteur de débit intérieur (types douches)', 1, 10, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ("Chasse d'eau à vitesse", 1, 10, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Autres solutions', 1, 10, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 10, 4);

#Question 3 Theme 3
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Oui', 1, 11, 2);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 11, 2);

#Question 1 Theme 4
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('kW.h', 0, 12, 1);

#Question 2 Theme 4
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Panneaux solaires', 1, 13, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Electricité verte (abonnement spécifiques)', 1, 13, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Energie hydraulique grâce aux courants marins', 1, 13, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Energie éolienne hélicoïdale', 1, 13, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ("Autres types d'énergies", 1, 13, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 13, 4);

#Question 3 Theme 4
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Détecteur de mouvements', 1, 14, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Mise en veille automatique du matériel informatique', 1, 14, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Utilisation de lampes basse consommation', 1, 14, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Autres réductions', 1, 14, 3);
INSERT INTO answer(title, weight, id_question, id_answer_type) VALUES ('Non', 0, 14, 4);

#Question 4 Theme 4
INSERT INTO answer( title, weight, id_question, id_answer_type ) VALUES ('Oui', 1, 15, 2);
INSERT INTO answer( title, weight, id_question, id_answer_type ) VALUES ('Non', 0, 15, 2);

#------------------------------------------------------------
# Table: recommandation
#------------------------------------------------------------

INSERT INTO recommandation(title, content, url) VALUES ('Êtes-vous signataire...', 'Êtes-vous signataire de la Charte Zéro plastique de la Région Sud ? Cette adhésion vous apportera conseils et solutions pour optimiser la réduction de vos déchets et valoriser votre engagement ! Contact : Claire Poulin - c.poulin@arpe-arb.org', 'c.poulin@arpe-arb.org');
INSERT INTO recommandation(title, content, url) VALUES ('Renseignez vous auprès...', 'Renseignez vous auprès de votre Mairie concernant les solutions de tri sélectif.', '');
INSERT INTO recommandation(title, content, url) VALUES ('La Commune du lieu... ', 'La Commune du lieu de votre événement est elle engagée dans un programme zero dechet plastique ? Si oui cela peut vous aider dans vos démarches et votre engagement.', '');
INSERT INTO recommandation(title, content, url) VALUES ('Positionnez vos poubelles...', "Positionnez vos poubelles de tri de manière stratégique, afin d'en faciliter l'accès au grand public et aux compétiteurs et proposez une signalétique adaptée en ce sens.", '');
INSERT INTO recommandation(title, content, url) VALUES ('Mettez à disposition...', 'Mettez à disposition du public des fontaines à eau ou servez des boissons dans des verres réutilisables.', '');
INSERT INTO recommandation(title, content, url) VALUES ("Saviez-vous qu'il existe...", "Saviez-vous qu'il existe des associations locales spécialisées dans la collecte des déchets (Les Alchimistes, Les Petites Choses, etc) ou mettant à disposition un annuaire des acteurs locaux engagés, telle que l'Agence Régionale pour la Biodiversité et l'Environnement N'hésitez pas à les contacter ! ARPE-ARB Agence régionale pour l'environnement Agence régionale de la biodiversité", '');

INSERT INTO recommandation(title, content, url) VALUES ('Installez un ou plusieurs...', "Installez un ou plusieurs composteurs sur le lieu de votre événement. Le compostage est à la fois bon pour l'environnement, la société et pour l'économie ! Renseignez-vous auprès de vos collectivités locales.", '');

INSERT INTO recommandation(title, content, url) VALUES ("Contactez l'APER,...", "Contactez l'APER, éco-organisme national agréé par le Ministère de la transition écologique et solidaire en charge de gérer la déconstruction et le recyclage des bateaux de plaisance en fin de vie, en partenariat avec la FFV. Filière de déconstruction des bateaux de plaisance, APER recyclermonbateau.fr FFVoile - Developpement Durable", 'recyclermonbateau.fr');
INSERT INTO recommandation(title, content, url) VALUES ('Pour une alimentation plus sûre...', 'Pour une alimentation plus sûre et plus durable, privilégiez une restauration locale afin de faire travailler les producteurs et les prestataires locaux. Retrouvez les infos utiles sur Alimentation Locale - Ma Région Sud', 'maregionsud.fr');
INSERT INTO recommandation(title, content, url) VALUES ('Votre Commune ou Intercommunalité', "Votre Commune ou Intercommunalité a peut-être déjà développé des actions et des outils de communication dédiés, renseignez-vous directement auprès d'elles !", '');
INSERT INTO recommandation(title, content, url) VALUES ('Saviez-vous que la Ligue Sud...', "Saviez-vous que la Ligue Sud de Voile a lancé une campagne d'informations nommée Ecorégatier ? Infos et contact : Lise Vidal", '');
INSERT INTO recommandation(title, content, url) VALUES ("Connaissez-vous la campagne Inf'eau mer...", "Connaissez-vous la campagne Inf'eau mer destinée à répondre aux questions du grand public concernant l'environnement et la protection de la mer ? Infos et contacts sur", 'http://www.infeaumer.org/');
INSERT INTO recommandation(title, content, url) VALUES ('Renseignez-vous sur les actions...', 'Renseignez-vous sur les actions menées par les associations locales : Asso Mer Terre, Collectif des calanques, etc…', '');
INSERT INTO recommandation(title, content, url) VALUES ('', "Connaissez-vous la plateforme ReMed Zéro Plastique, un réseau qui rassemble et fédère à l'échelle de la Région SUD, toute organisation ou partie prenante souhaitant contribuer à la réduction des déchets sauvages qui aboutissent en Méditerranée ?", 'http://www.remed-zero-plastique.org/');
INSERT INTO recommandation(title, content, url) VALUES ('Les Parcs naturels régionaux et nationaux...', 'Les Parcs naturels régionaux et nationaux mènent régulièrement des actions de sensibilisation sur le terrain. Contactez-les afin de bénéficier de leur expertise ! Fédération des Parcs naturels régionaux parcs-naturels-regionaux.fr Parc national des Calanques Site officiel calanques-parcnational.fr', 'calanques-parcnational.fr');
INSERT INTO recommandation(title, content, url) VALUES ('Ecogestes en Méditerranée,...', 'Ecogestes en Méditerranée, une campagne de sensibilisation en direction des plaisanciers Infos et contacts sur Ecogestes Méditerrannée - Vivre et respecter la mer au quotidien ecogestes-mediterranee.fr', 'ecogestes-mediterranee.fr');
INSERT INTO recommandation(title, content, url) VALUES ('Formation Gestionnaires de bases...', 'Formation Gestionnaires de bases nautiques Infos et contact :formation@cpie-coteprovencale.fr - 04 42 08 71 07 Inscriptions en ligne :', 'https://forms.gle/kfJtwMG3Jb5w3ohZ6');
INSERT INTO recommandation(title, content, url) VALUES ('Pensez aux opérations...', "Pensez aux opérations « Parking propre » avant d'aller sur l'eau !", '');
INSERT INTO recommandation(title, content, url) VALUES ("Equipez vous d'un compteur d'eau...", "Equipez vous d'un compteur d'eau dernière génération avec capteurs d'eau, pour détecter les fuites.", '');
INSERT INTO recommandation(title, content, url) VALUES ("Saviez-vous qu'un réducteur...", "Saviez-vous qu'un réducteur d'eau réduit le débit, mais pas la capacité d'usage ?", '');

INSERT INTO recommandation(title, content, url) VALUES ("Equipez vous d'un pistolet avec...", "Equipez vous d'un pistolet avec arrêt immédiat pour les tuyaux d'arrosage.", '');
INSERT INTO recommandation(title, content, url) VALUES ('Récupérer les eaux pluviales...', "Récupérer les eaux pluviales est une solution écologique car elle préserve les nappes phréatiques, mais aussi économique car elle est gratuite ! De plus, l'eau de pluie est douce, peu calcaire et à température ambiante. Equipez vous d'un récupérateur d'eaux de pluie !", '');
INSERT INTO recommandation(title, content, url) VALUES ('Consultez le site FAIRE, le service public...', 'Consultez le site FAIRE, le service public qui vous guide gratuitement dans vos travaux de rénovation énergétique. Infos sur FAIRE Le service public de la rénovation énergétique', '');

INSERT INTO recommandation(title, content, url) VALUES ("Saviez-vous qu'une ampoule à économie...", "Saviez-vous qu'une ampoule à économie d'énergie consomme 3 à 5 fois moins d'énergie et dure 6 à 8 fois plus longtemps ?", '');

INSERT INTO recommandation(title, content, url) VALUES ('Pensez à la consommation cachée...', "Pensez à la consommation cachée des appareils en veille ! Selon l'Agence de l'environnement et de la maîtrise de l'énergie (Ademe), la puissance totale des veilles cachées pour un foyer dépasserait souvent 50 W. Les supprimer représenterait ainsi une économie de plus de 80 €/an.", '');

INSERT INTO recommandation(title, content, url) VALUES ('Connaissez-vous la Domotique ?...', 'Connaissez-vous la Domotique ? Elle est notamment utile pour la déconnexion complète des appareils électriques.', '');


#------------------------------------------------------------
# Table: related_to
#------------------------------------------------------------

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (1, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (1, 2, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (1, 3, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (1, 5, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (2, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (2, 2, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (2, 3, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (2, 4, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (2, 5, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (3, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (3, 2, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (3, 3, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (3, 4, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (3, 5, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (5, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (5, 2, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (5, 3, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (5, 4, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (5, 5, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (6, 1, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (7, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (7, 6, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (7, 7, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (8, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (8, 2, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (8, 3, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (8, 6, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (9, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (9, 2, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (9, 3, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (9, 6, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (10, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (10, 2, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (10, 3, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (10, 6, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (11, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (11, 2, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (11, 3, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (11, 4, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (11, 6, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (11, 7, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (13, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (13, 6, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (13, 8, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (14, 9, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (15, 9, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (16, 1, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (17, 1, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (18, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (18, 5, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (19, 1, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (19, 5, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (19, 9, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (22, 11, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (22, 12, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (22, 13, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (22, 14, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (22, 16, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (23, 11, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (23, 11, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (24, 11, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (25, 11, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (26, 11, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (26, 12, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (26, 13, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (26, 14, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (26, 16, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (28, 15, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (28, 11, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (28, 16, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (28, 12, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (28, 13, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (28, 14, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (28, 17, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (28, 18, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (29, 19, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (30, 20, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (30, 21, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (31, 20, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (34, 19, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (34, 20, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (34, 21, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (37, 22, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (39, 23, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (40, 23, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (41, 23, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (42, 23, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (43, 23, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (44, 23, '', '');

INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (46, 26, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (47, 24, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (48, 24, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (48, 25, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (48, 26, '', '');
INSERT INTO related_to (id_answer, id_recommandation, trigger_value, trigger_max) VALUES (49, 24, '', '');


