DROP DATABASE IF EXISTS atalla_corp_db;
CREATE DATABASE atalla_corp_db;
USE atalla_corp_db;

--  DROP TABLE IF EXISTS department;
--  DROP TABLE IF EXISTS role;
--  DROP TABLE IF EXISTS employees;

  CREATE TABLE department(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
  );
  
  CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50),
  salary DECIMAL(11, 2),
  department_id INTEGER,
  CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id)
 );
 
  CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  roles_id INTEGER NOT NULL,
  manager_id INTEGER,
  CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
 );







