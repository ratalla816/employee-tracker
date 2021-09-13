 DROP TABLE IF EXISTS divisions;
 DROP TABLE IF EXISTS roles;
 DROP TABLE IF EXISTS employees;


CREATE TABLE divisions (
   id INTEGER AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY(id),
  description TEXT
);

CREATE TABLE roles (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(11,2) NOT NULL,
  divisions_id INTEGER NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(divisions_id) REFERENCES divisions(id)
 );

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  roles_id INTEGER NULL,
  manager_id INTEGER NULL,
  FOREIGN KEY (roles_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
 );







