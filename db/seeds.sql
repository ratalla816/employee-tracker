 
 
 INSERT INTO department (name)
 VALUES
  ("executive"),
  ("sales"),
  ("research"),
  ("accounting"),
  ("devops"),
  ("compliance"),
  ("hr");

 INSERT INTO roles (title, salary, department_id)
 VALUES
  ("ceo", 100000000, 1),
  ("accountexec", 90000, 2),
  ("scientist", 200000, 3),
  ("beancounter", 20000, 4),
  ("engineer", 150000, 5),
  ("attorney", 150000, 6),
  ("recruiter", 40000, 7);
 
  
 INSERT INTO employees (first_name, last_name, roles_id, manager_id)
 VALUES
  ("Rob", "Atalla", 1, NULL),
  ("Jack", "London", 2, NULL),
  ("Robert", "Bruce", 3, NULL),
  ("Peter", "Greenaway", 4, NULL),
  ("Chip", "Chipperson", 5, NULL),
  ("Ted", "Scheckler", 6, NULL),
  ("Greg", "Hughes", 7, NULL);

 
  


  
  