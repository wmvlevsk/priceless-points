type db/create_schema.sql db/user_creation.sql db/tables/ACTIVITY.sql db/tables/EMPLOYEE.sql db/tables/POINT_TALLY.sql db/tables/LOAD_AUD.sql db/mock_data/ACTIVITY.sql db/mock_data/EMPLOYEE.sql db/mock_data/POINT_TALLY.sql db/mock_data/LOAD_AUD.sql > temp.sql

mysql -u root -p < temp.sql
del temp.sql
