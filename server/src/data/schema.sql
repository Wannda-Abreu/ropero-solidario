create database ropero_solidario;
use ropero_solidario;

CREATE TABLE Users (
  user_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  user_name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  nationality VARCHAR(50) NOT NULL,
  date_of_last_report_id  BINARY(16),
  family_members_id BINARY(16),
  zip_code_id BINARY(16),
  reference_center_id BINARY(16),
  apointment_id BINARY(16)
);
CREATE TABLE Family_info (
family_info_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
number_family_members INT NOT NULL,
underaged_members INT,
overaged_members INT
);


CREATE TABLE Telephones (
  telephone_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  telephone VARCHAR(50) NOT NULL,
  user_id BINARY(16)
);

CREATE TABLE ZIPCode (
  zip_code_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  zip_code INT
);

CREATE TABLE Reference_center (
  reference_center_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  reference_center varchar(120)
);
CREATE TABLE Ampointments(
  apointment_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  apointment_day VARCHAR(40) NOT NULL,
  apointment_month VARCHAR(40) NOT NULL,
  apointment_year VARCHAR(40) NOT NULL,
  apointment_time VARCHAR(40) NOT NULL
);
  CREATE TABLE Date_of_last_report(
  date_of_last_report_id  BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  day_of_last_report DATE NOT NULL
);


CREATE TABLE Admin_Users(
   admin_user_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
   admin_name VARCHAR(60) NOT NULL,
   admin_surname VARCHAR(60) NOT NULL,
   email VARCHAR(60) NOT NULL,
   admin_password CHAR(64) NOT NULL,
   users_role_id VARCHAR(60)

);

CREATE TABLE Roles(
    roles_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
    roles VARCHAR(60)
);

CREATE TABLE Admin_user_Roles(
admin_user_id BINARY(16) NOT NULL,
roles_id BINARY(16) NOT NULL

);


ALTER TABLE Users ADD FOREIGN KEY (zip_code_id) REFERENCES ZIPCode (zip_code_id);

ALTER TABLE Users ADD FOREIGN KEY (reference_center_id) REFERENCES Reference_center (reference_center_id);

ALTER TABLE Telephones ADD FOREIGN KEY (user_id) REFERENCES Users (user_id);

ALTER TABLE Users ADD FOREIGN KEY (family_members_id) REFERENCES Family_info (family_info_id);


ALTER TABLE Users ADD FOREIGN KEY (date_of_last_report_id) REFERENCES  Date_of_last_report (date_of_last_report_id);

ALTER TABLE Users ADD FOREIGN KEY (apointment_id) REFERENCES  Ampointments (apointment_id);
 
ALTER TABLE  Admin_user_Roles ADD FOREIGN KEY (admin_user_id) REFERENCES  Admin_Users (admin_user_id);

ALTER TABLE  Admin_user_Roles ADD FOREIGN KEY (roles_id) REFERENCES  Roles (roles_id);

