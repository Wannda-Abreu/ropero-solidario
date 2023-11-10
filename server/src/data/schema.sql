create database ropero_solidario;
use ropero_solidario;

CREATE TABLE Users (
  user_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  user_name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  user_password VARCHAR(60) NOT NULL,
  nationality VARCHAR(50) NOT NULL,
  family_members_id BINARY,
  zip_code_id BINARY(16),
  reference_center_id BINARY(16)
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
cuantity INT
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

ALTER TABLE Users ADD FOREIGN KEY (zip_code_id) REFERENCES ZIPCode (zip_code_id);

ALTER TABLE Users ADD FOREIGN KEY (reference_center_id) REFERENCES Reference_center (reference_center_id);

ALTER TABLE Telephones ADD FOREIGN KEY (user_id) REFERENCES Users (user_id);

ALTER TABLE Users ADD FOREIGN KEY (family_members_id) REFERENCES Family_info (family_info_id);

ALTER TABLE Family_info_clothes_sizes ADD FOREIGN KEY (clothes_sizes_id) REFERENCES Clothes_Sizes (clothes_sizes_id);

ALTER TABLE Family_info_clothes_sizes ADD FOREIGN KEY (family_info_id) REFERENCES Family_info  (family_info_id);





INSERT INTO Users (user_name, surname, user_password, nationality)
VALUES ('John', 'Doe', 'password123', 'USA');