 DROP TABLE IF EXISTS employees;
 DROP TABLE IF EXISTS roles;
 DROP TABLE IF EXISTS divisions;
 
 INSERT INTO employees (first_name, last_name, manager_id, roles_id)
 VALUES
  ('Rob', 'Atalla', 1, 1,),
  ('Jack', 'London', 2,3),
  ('Robert', 'Bruce', 2,2),
  ('Peter', 'Greenaway', 2,4),

INSERT INTO roles (title, salary, division_id)
VALUES
  ('manager', 100000000, 1,),
  ('employee', 150000, 2),
  

INSERT INTO divisions (name)
VALUES
  ('c-suite'),
  ('sales'),
  ('research'),
  ('devops')
  
  