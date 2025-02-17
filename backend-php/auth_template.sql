CREATE DATABASE IF NOT EXISTS `auth_template`;
USE `auth_template`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_photo VARCHAR(255) DEFAULT NULL
);