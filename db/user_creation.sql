GRANT USAGE ON *.* TO 'POINTS_USER'@'localhost';
DROP USER 'POINTS_USER'@localhost;
FLUSH PRIVILEGES;
CREATE USER 'POINTS_USER'@'localhost' IDENTIFIED BY 'POINTS_USER';

--#add grants/privileges so user can log in
GRANT DELETE ON POINTS.* TO 'POINTS_USER'@'localhost';
GRANT INSERT ON POINTS.* TO 'POINTS_USER'@'localhost';
GRANT SELECT ON POINTS.* TO 'POINTS_USER'@'localhost';
GRANT UPDATE ON POINTS.* TO 'POINTS_USER'@'localhost';
