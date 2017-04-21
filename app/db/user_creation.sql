CREATE USER 'POINTS_USER'@'localhost' IDENTIFIED BY 'POINTS_USER';

--#add grants/privileges so user can log in
GRANT DELETE ON PULSE.* TO 'POINTS_USER'@'localhost';
GRANT INSERT ON PULSE.* TO 'POINTS_USER'@'localhost';
GRANT SELECT ON PULSE.* TO 'POINTS_USER'@'localhost';
GRANT UPDATE ON PULSE.* TO 'POINTS_USER'@'localhost';

