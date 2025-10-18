CREATE DATABASE user_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE user_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  gender TEXT,
  birthdate TEXT,
  hobby TEXT,
  other TEXT
);

SHOW TABLES;

DESCRIBE users;