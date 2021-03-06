USE POINTS;
CREATE TABLE IF NOT EXISTS POINTS.REF_POINTS (
    EMPLOYEE_ID INT NOT NULL,
    FIRST_NAME VARCHAR(255) NOT NULL,
    LAST_NAME VARCHAR(255) NOT NULL,
    Q1_PTS INT,
    Q2_PTS INT,
    Q3_PTS INT,
    Q4_PTS INT,
    ENT_DT TIMESTAMP NOT NULL,
    PRIMARY KEY (EMPLOYEE_ID), 
    FOREIGN KEY (EMPLOYEE_ID) REFERENCES EMPLOYEE(EMPLOYEE_ID)
);
