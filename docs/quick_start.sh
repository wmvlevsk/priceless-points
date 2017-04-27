cat ../db/create_schema.sql > temp.sql
cat ../db/user_creation.sql >> temp.sql
cat ../db/tables/ACTIVITY.sql >> temp.sql
cat ../db/tables/EMPLOYEE.sql >> temp.sql
cat ../db/tables/POINT_TALLY.sql >> temp.sql
cat ../db/tables/REF_POINTS.sql >> temp.sql
cat ../db/tables/LOAD_AUD.sql >> temp.sql
cat ../db/mock_data/ACTIVITY.sql >> temp.sql
cat ../db/mock_data/EMPLOYEE.sql >> temp.sql
cat ../db/mock_data/POINT_TALLY.sql >> temp.sql
cat ../db/mock_data/REF_POINTS.sql >> temp.sql
cat ../db/mock_data/LOAD_AUD.sql >> temp.sql

mysql -u root -p < temp.sql
rm temp.sql
