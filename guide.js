1. SELECT * FROM restaurants;

2. SELECT * FROM restaurants WHERE cuisine = 'Italian';

3. SELECT id, name FROM restaurants WHERE cuisine = 'Italian' LIMIT 10;

4. SELECT count(*) FROM restaurants WHERE cuisine = 'Thai';

5. SELECT count(*) FROM restaurants;

6. SELECT count(*) FROM restaurants WHERE cuisine = 'Thai' AND address_zipcode = '11372';

7. SELECT id, name FROM restaurants WHERE address_zipcode IN ('10012', '10013', '10014') ORDER BY name LIMIT 5;

8. INSERT INTO restaurants (name, borough, cuisine, address_building_number, address_street, address_zipcode) VALUES ('Byte Cafe', 'Brooklyn', 'coffee', '123', 'Atlantic Avenue', '11231');

9. INSERT INTO restaurants (name, cuisine) VALUES ('SoCal Poke', 'poke') RETURNING id, name;

10. INSERT INTO restaurants (name) VALUES ('David'), ('Linda'), ('Poke Cafe') RETURNING id, name;

11. UPDATE restaurants SET name = 'DJ Reynolds Pub and Restaurant' WHERE nyc_restaurant_id = '30191841';

12. DELETE FROM grades WHERE id = 10;

13. DELETE FROM restaurants WHERE id = 22;
ERROR:  update or delete on table "restaurants" violates foreign key constraint "grades_restaurant_id_fkey" on table "grades"
DETAIL:  Key (id)=(22) is still referenced from table "grades".

14. CREATE TABLE inspectors( first_name NOT NULL, last_name text NOT NULL, borough borough_options, id serial PRIMARY KEY);

15. ALTER TABLE grades ADD COLUMN notes text;

16. DROP TABLE inspectors;