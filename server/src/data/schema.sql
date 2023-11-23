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
  appointment_id BINARY(16)
);
CREATE TABLE Families_info (
family_info_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
number_of_family_members INT NOT NULL,
underaged_family_members INT,
overaged_family_members INT
);


CREATE TABLE Telephones (
  telephone_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  telephone VARCHAR(50) NOT NULL,
  user_id BINARY(16)
);

CREATE TABLE ZIPCodes (
  zip_code_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  zip_code INT
);

CREATE TABLE Reference_centers (
  reference_center_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  reference_center varchar(120)
);
CREATE TABLE Appointments(
  appointment_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  appointment_day VARCHAR(40) NOT NULL,
  appointment_month VARCHAR(40) NOT NULL,
  appointment_year VARCHAR(40) NOT NULL,
  appointment_time_id BINARY(16)
);

CREATE TABLE appoitment_times(
   appointment_time_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
   available_times  CHAR(5) NOT NULL,
   is_active BOOL NOT NULL
);

  CREATE TABLE Dates_of_last_report(
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

CREATE TABLE Admin_users_Roles(
admin_user_id BINARY(16) NOT NULL,
roles_id BINARY(16) NOT NULL
);


ALTER TABLE Users ADD FOREIGN KEY (zip_code_id) REFERENCES ZIPCodes (zip_code_id);

ALTER TABLE Users ADD FOREIGN KEY (reference_center_id) REFERENCES Reference_centers (reference_center_id);

ALTER TABLE Telephones ADD FOREIGN KEY (user_id) REFERENCES Users (user_id);

ALTER TABLE Users ADD FOREIGN KEY (family_members_id) REFERENCES Families_info (family_info_id);


ALTER TABLE Users ADD FOREIGN KEY (date_of_last_report_id) REFERENCES  Dates_of_last_report (date_of_last_report_id);

ALTER TABLE Users ADD FOREIGN KEY (appointment_id) REFERENCES  Appointments (appointment_id);
 
ALTER TABLE  Admin_users_Roles ADD FOREIGN KEY (admin_user_id) REFERENCES  Admin_Users (admin_user_id);

ALTER TABLE  Admin_users_Roles ADD FOREIGN KEY (roles_id) REFERENCES  Roles (roles_id);