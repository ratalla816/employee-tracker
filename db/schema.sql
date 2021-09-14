 USE employee_db;
 DROP TABLE IF EXISTS divisions;
 DROP TABLE IF EXISTS roles;
 DROP TABLE IF EXISTS employees;


  CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(11, 2),
  divisions_id INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY(divisions_id) REFERENCES divisions(id)
 );
 
  CREATE TABLE divisions (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(50),
  PRIMARY KEY(id),
  description TEXT
);

  CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  roles_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (roles_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
 );







