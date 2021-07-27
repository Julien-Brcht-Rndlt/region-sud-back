#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

DROP DATABASE region_sud;

CREATE DATABASE region_sud;

USE region_sud;

#------------------------------------------------------------
# Table: organization
#------------------------------------------------------------

CREATE TABLE organization(
        id            Int  Auto_increment  NOT NULL ,
        orgName          Varchar (150) NOT NULL ,
        orgStaff      Integer ,
        password      Varchar (50) NULL
	,CONSTRAINT organization_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: theme
#------------------------------------------------------------

CREATE TABLE theme(
        id        Int  Auto_increment  NOT NULL ,
        title     Varchar (150) ,
        icon      Varchar (50) NULL
	,CONSTRAINT theme_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: event
#------------------------------------------------------------

CREATE TABLE event(
        id              Int  Auto_increment  NOT NULL ,
        title           Varchar (150) NOT NULL ,
        address         Text NOT NULL ,
        loc             Text NOT NULL ,
        staff           Integer ,
        startDate       varchar(150) ,
        endDate	 varchar(150) ,
        activity        Text NULL ,
        sportLevel     Text NULL ,
        id_organization Int NOT NULL
	,CONSTRAINT event_PK PRIMARY KEY (id)

	,CONSTRAINT event_organization_FK FOREIGN KEY (id_organization) REFERENCES organization(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: question
#------------------------------------------------------------

CREATE TABLE question(
        id       Int  Auto_increment  NOT NULL ,
        title    Varchar (150) NOT NULL ,
        id_theme Int NOT NULL
	,CONSTRAINT question_PK PRIMARY KEY (id)

	,CONSTRAINT question_theme_FK FOREIGN KEY (id_theme) REFERENCES theme(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: answer_type
#------------------------------------------------------------

CREATE TABLE answer_type(
        id    Int  Auto_increment  NOT NULL ,
        title Varchar (150) NOT NULL
	,CONSTRAINT answer_type_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: answer
#------------------------------------------------------------

CREATE TABLE answer(
        id             Int  Auto_increment  NOT NULL ,
        title          Varchar (150) NOT NULL ,
        weight         Integer NOT NULL ,
        id_question    Int NOT NULL ,
        id_answer_type Int NOT NULL
	,CONSTRAINT answer_PK PRIMARY KEY (id)

	,CONSTRAINT answer_question_FK FOREIGN KEY (id_question) REFERENCES question(id)
	,CONSTRAINT answer_answer_type0_FK FOREIGN KEY (id_answer_type) REFERENCES answer_type(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: recommandation
#------------------------------------------------------------

CREATE TABLE recommandation(
        id      Int  Auto_increment  NOT NULL ,
        title   Text NOT NULL ,
        content Text NOT NULL,
        url     Varchar(255)
	,CONSTRAINT recommandation_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: is_evaluated
#------------------------------------------------------------

CREATE TABLE is_evaluated(
        id_event       Int NOT NULL ,
        id_theme Int NOT NULL ,
        score    Integer
	,CONSTRAINT is_evaluated_PK PRIMARY KEY (id_event,id_theme)

	,CONSTRAINT is_evaluated_event_FK FOREIGN KEY (id_event) REFERENCES event(id)
	,CONSTRAINT is_evaluated_theme0_FK FOREIGN KEY (id_theme) REFERENCES theme(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: eval_answer
#------------------------------------------------------------

CREATE TABLE eval_answer(
        id_answer           Int NOT NULL ,
        id_event     Int NOT NULL ,
        answer_value Varchar(255)
	,CONSTRAINT eval_answer_PK PRIMARY KEY (id_answer,id_event)

	,CONSTRAINT eval_answer_answer_FK FOREIGN KEY (id_answer) REFERENCES answer(id)
	,CONSTRAINT eval_answer_event0_FK FOREIGN KEY (id_event) REFERENCES event(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: related_to
#------------------------------------------------------------

CREATE TABLE related_to(
        id_answer               Int NOT NULL ,
        id_recommandation Int NOT NULL ,
        trigger_value     Varchar (50) NOT NULL ,
        trigger_max       Varchar (50)
	,CONSTRAINT related_to_PK PRIMARY KEY (id_answer,id_recommandation)

	,CONSTRAINT related_to_answer_FK FOREIGN KEY (id_answer) REFERENCES answer(id)
	,CONSTRAINT related_to_recommandation0_FK FOREIGN KEY (id_recommandation) REFERENCES recommandation(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: admin
#------------------------------------------------------------

CREATE TABLE admin(
        id       Int  Auto_increment  NOT NULL ,
        username Varchar (150) NOT NULL ,
        password Varchar (25) NOT NULL ,
        email    Varchar (50) NOT NULL
	,CONSTRAINT admin_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: testimony
#------------------------------------------------------------

CREATE TABLE testimony(
        id Int  Auto_increment  NOT NULL
	,CONSTRAINT testimony_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: bon_plan
#------------------------------------------------------------

CREATE TABLE bon_plan(
        id    Int  Auto_increment  NOT NULL ,
        title Varchar (150) NOT NULL
	,CONSTRAINT bon_plan_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: accompagnement
#------------------------------------------------------------

CREATE TABLE accompagnement(
        id    Int  Auto_increment  NOT NULL ,
        title Varchar (150) NOT NULL
	,CONSTRAINT accompagnement_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: faq
#------------------------------------------------------------

CREATE TABLE faq(
        id       Int  Auto_increment  NOT NULL ,
        question Text NOT NULL ,
        answer   Text NOT NULL
	,CONSTRAINT faq_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: address_autocompletion
#------------------------------------------------------------

CREATE TABLE address_autocompletion(
        id          Int  Auto_increment  NOT NULL ,
        city        Varchar (100) NOT NULL ,
        city_upper  Varchar (100) NOT NULL ,
        postal_code Varchar (100) NOT NULL ,
        insee_code  Integer NOT NULL ,
        region_code Integer NOT NULL ,
        latitude    Decimal NOT NULL ,
        longitude   Decimal NOT NULL
	,CONSTRAINT address_autocompletion_PK PRIMARY KEY (id)
)ENGINE=InnoDB;



