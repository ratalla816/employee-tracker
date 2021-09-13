 DROP TABLE IF EXISTS employees;
 DROP TABLE IF EXISTS roles;
 DROP TABLE IF EXISTS divisions;



CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INTEGER NULL,
  roles_id INTEGER NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
   -- CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

CREATE TABLE roles (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(11,2) NOT NULL,
  division_id INTEGER(50) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(division_id) REFERENCES division(id)
 );



CREATE TABLE divisions (
   id INTEGER AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY(id),
  description TEXT
);

-- CREATE TABLE managers (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
  -- party_id INTEGER,
  -- industry_connected BOOLEAN NOT NULL,
  -- CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
-- );



