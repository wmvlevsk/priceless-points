USE POINTS;
CREATE TABLE IF NOT EXISTS POINTS.EVENT (
    EVENT_NAME VARCHAR(255) NOT NULL,
    ENT_DT TIMESTAMP NOT NULL,
    PRIMARY KEY(EVENT_NAME, ENT_DT)
); 
