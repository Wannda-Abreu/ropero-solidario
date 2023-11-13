create database ropero_solidario;
use ropero_solidario;

CREATE TABLE Users (
  user_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  user_name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  nationality VARCHAR(50) NOT NULL,
  date_of_last_report_id  BINARY(16) NOT NULL,
  family_members_id BINARY(16) NOT NULL,
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
CREATE TABLE Clothes_Sizes(
clothes_sizes_id BINARY(16)  PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
size varchar(50) NOT NULL,
quantity INT
);

CREATE TABLE Family_info_clothes_sizes(
  clothes_sizes_id BINARY,
  family_info_id BINARY
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
  apointment_date VARCHAR(60),
  apointment_time VARCHAR(60)
);
  CREATE TABLE Date_of_last_report(
  date_of_last_report_id  BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  day_of_last_report DATE NOT NULL
);


CREATE TABLE Admin_User(
   admin_user_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
   admin_name VARCHAR(60) NOT NULL,
   admin_surname VARCHAR(60) NOT NULL,
   email VARCHAR(60) NOT NULL,
   admin_password CHAR(64) NOT NULL
);

ALTER TABLE Users ADD FOREIGN KEY (zip_code_id) REFERENCES ZIPCode (zip_code_id);

ALTER TABLE Users ADD FOREIGN KEY (reference_center_id) REFERENCES Reference_center (reference_center_id);

ALTER TABLE Telephones ADD FOREIGN KEY (user_id) REFERENCES Users (user_id);

ALTER TABLE Users ADD FOREIGN KEY (family_members_id) REFERENCES Family_info (family_info_id);

ALTER TABLE Family_info_clothes_sizes ADD FOREIGN KEY (clothes_sizes_id) REFERENCES Clothes_Sizes (clothes_sizes_id);

ALTER TABLE Family_info_clothes_sizes ADD FOREIGN KEY (family_info_id) REFERENCES Family_info (family_info_id);

ALTER TABLE Users ADD FOREIGN KEY (date_of_last_report_id) REFERENCES  Date_of_last_report (date_of_last_report_id);

ALTER TABLE Users ADD FOREIGN KEY (apointment_id) REFERENCES  Ampointments (apointment_id);

