-- Delete and recreate weather database
DROP DATABASE IF EXISTS weather;
CREATE DATABASE weather;
USE weather;

-- Run schema
SOURCE weather-schema.sql;

-- Run seed data
SOURCE weather-seed.sql;