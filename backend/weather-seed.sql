INSERT INTO users (username, password)
VALUES
('user', '$2b$12$w38HHZmTTuTrUKwjkNAIb.L/BRceURuYaH6hYnc53rDHzMlZZW5bC'),
('user1', '$2b$12$qCHaADpsBw8TTWNifisLL./Bq7JtTaBhMMuvtaxKAZ1ee4pg/sBPi');

INSERT INTO addresses (address, username)
VALUES
('Phoenix', 'user'),
('Los Angeles', 'user'),
('Las Vegas', 'user1'),
('New York', 'user1');