USE POINTS;
INSERT INTO POINTS.POINT_TALLY (EMPLOYEE_ID, ACTIVITY_ID, ENT_DT, LOAD_FILE) VALUES (100000, 1, (SELECT TIMESTAMP('2017-04-11')), 'MOCK_DATA.XLS') ON DUPLICATE KEY UPDATE EMPLOYEE_ID = 100000, ACTIVITY_ID = 100, ENT_DT = (SELECT TIMESTAMP('2017-04-11')), LOAD_FILE = 'MOCK_DATA.XLS';
INSERT INTO POINTS.POINT_TALLY (EMPLOYEE_ID, ACTIVITY_ID, ENT_DT, LOAD_FILE) VALUES (100000, 2, (SELECT TIMESTAMP('2017-04-11')), 'MOCK_DATA.XLS') ON DUPLICATE KEY UPDATE EMPLOYEE_ID = 100000, ACTIVITY_ID = 200, ENT_DT = (SELECT TIMESTAMP('2017-04-11')), LOAD_FILE = 'MOCK_DATA.XLS';
INSERT INTO POINTS.POINT_TALLY (EMPLOYEE_ID, ACTIVITY_ID, ENT_DT, LOAD_FILE) VALUES (100000, 3, (SELECT TIMESTAMP('2017-04-11')), 'MOCK_DATA.XLS') ON DUPLICATE KEY UPDATE EMPLOYEE_ID = 100000, ACTIVITY_ID = 300, ENT_DT = (SELECT TIMESTAMP('2017-04-11')), LOAD_FILE = 'MOCK_DATA.XLS';
INSERT INTO POINTS.POINT_TALLY (EMPLOYEE_ID, ACTIVITY_ID, ENT_DT, LOAD_FILE) VALUES (100001, 1, (SELECT TIMESTAMP('2017-04-11')), 'MOCK_DATA.XLS') ON DUPLICATE KEY UPDATE EMPLOYEE_ID = 100001, ACTIVITY_ID = 100, ENT_DT = (SELECT TIMESTAMP('2017-04-11')), LOAD_FILE = 'MOCK_DATA.XLS';
