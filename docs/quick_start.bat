type ..\db\create_schema.sql ..\db\user_creation.sql ..\db\tables\ACTIVITY.sql ..\db\tables\EMPLOYEE.sql ..\db\tables\POINT_TALLY.sql ..\db\tables\REF_POINTS.sql ..\db\tables\LOAD_AUD.sql ..\db\tables\EVENT.sql ..\db\tables\LOGIN.sql ..\db\mock_data\ACTIVITY.sql ..\db\mock_data\EMPLOYEE.sql ..\db\mock_data\POINT_TALLY.sql ..\db\mock_data\REF_POINTS.sql ..\db\mock_data\LOAD_AUD.sql ..\db\mock_data\EVENT.sql ..\db\mock_data\LOGIN.sql > temp.sql

mysql -u root -p < temp.sql
del temp.sql
