CREATE TABLE `user` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `alias` VARCHAR(30) NOT NULL UNIQUE,
    `email` VARCHAR(30) NOT NULL UNIQUE,
    `hashed_password` varchar(255) NOT NULL,
    `profile_picture` VARCHAR(255),
    `is_admin` BOOL DEFAULT FALSE NOT NULL,
    `is_verify` BOOL DEFAULT FALSE NOT NULL
);

