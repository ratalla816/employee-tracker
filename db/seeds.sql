 USE employee_db;
 
 
 INSERT INTO divisions (division)
VALUES
  ("csuite"),
  ("sales"),
  ("research"),
  ("devops")

 INSERT INTO roles (title, salary, division_id)
VALUES
  ("manager", 10000000,1),
  ("employee", 200000,2),
  ("employee", 200000,3),
  ("employee", 200000,4)
  
 INSERT INTO employees (first_name, last_name, roles_id, manager_id)
 VALUES
  ("Rob", "Atalla",1,NULL),
  ("Jack", "London",2,1),
  ("Robert", "Bruce",3,1),
  ("Peter", "Greenaway",4,1)

  -- ("Rob", "Atalla"),
  -- ("Jack", "London"),
  -- ("Robert", "Bruce"),
  -- ("Peter", "Greenaway")

  


  
  