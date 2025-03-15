-- Create database
CREATE DATABASE IF NOT EXISTS nevnapok;
USE nevnapok;

-- Create table for name days
CREATE TABLE IF NOT EXISTS name_days (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    day INT NOT NULL,
    month INT NOT NULL
);

-- Sample data for name_days
INSERT INTO name_days (name, day, month) VALUES
('János', 27, 12),
('Mária', 15, 8),
('Péter', 29, 6);

-- Create table for name information
CREATE TABLE IF NOT EXISTS name_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    descr TEXT
);

-- Sample data for name_info
INSERT INTO name_info (name, gender, descr) VALUES
('János', 'male', 'János egy hagyományos magyar férfinév.'),
('Mária', 'female', 'Mária az egyik leggyakoribb női név.'),
('Péter', 'male', 'Péter név jelentése: szikla.');
