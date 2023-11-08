create database Ropero_solidario;
use ropero_solidario;
CREATE TABLE Users (
  user_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  user_name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  user_password VARCHAR(60) NOT NULL,
  family_members INT NOT NULL,
  underage BOOL NOT NULL,
  nationality VARCHAR(50) NOT NULL,
  zip_code_id BINARY(16),
  reference_center_id BINARY(16),
  report_img BINARY(16)
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
  reference_center varchar(50)
);

ALTER TABLE Users ADD FOREIGN KEY (zip_code_id) REFERENCES ZIPCode (zip_code_id);

ALTER TABLE Users ADD FOREIGN KEY (reference_center_id) REFERENCES Reference_center (reference_center_id);

ALTER TABLE Telephones ADD FOREIGN KEY (user_id) REFERENCES Users (user_id)