const inquirer = require('inquirer');

const mysql = require('mysql2');

const db = require('employee_db')

const fs = require("fs");

const PORT = process.env.PORT || 3001;
  
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'root',
      database: 'employee_db'
    },
    console.log('Connected to the employee database.')
  );

 
  // inquirer stuff goes here // -------------------------- //

  // array of questions for user input*
 const managerPrompts = [
   {
      type: "input",
      name: "first_name",
      message: "Please enter the manager's first name.",
  },    

  {
    type: "input",
    name: "last_name",
    message: "Please enter the manager's last name.",
  },    
      
  {
      type: "list",
      name: "department_id",
      message: "Please enter the manager's department.",
      choices: [
        "executive",
        "sales",
        "research",
        "accounting",
        "devops",
        "compliance",
        "hr"
      ],
  },
      
  {
      type: "input",
      name: "employee(id)",
      message: "Please enter the manager's employee id.",
  },
      
  {
      type: "input",
      name: "roles_id",
      message: "Please enter the manager's role id.",
  }
  ]
    
  // end of question array //
  
  const employArray = [];
  
      
       const buildManager = () => {
       return inquirer.prompt(managerPrompts)
      .then((prompts) => {
          const manager = new Manager(prompts.first_name, prompts.last_name, prompts.department_id, prompts.employee(id), prompts.roles_id);
          employArray.push(manager);
          console.log(manager)
                    
                  
      })  
  };
  
  const buildEmployee = () => {
      
      return inquirer.prompt ([
          {
             type: 'input',
             name: 'first_name',
             message: "Please enter the employee's first name", 
          },
      
          {
             type: 'input',
             name: 'last_name',
             message: "Please enter the employee's last name", 
          },
      
          {
              type: 'list',
              name: 'roles_id',
              message: "Please select their role",
              choices: ['accountexec', 'scientist', 'accountant', 'engineer', 'attorney', 'recruiter']
          },
           
          {
              type: 'input',
              name: 'manager_id',
              message: "Please enter their manager's ID (if unknown, enter 0).",
          },
  
          {
              type: 'confirm',
              name: 'buildEmployeeConfirm',
              message: 'Enter another employee?',
          }
      ])
      .then(userInput => {
          // Selects the data sets for each employee class
  
          let { first_name, last_name, roles_id, manager_id, buildEmployeeConfirm } = userInput; 
          let employee; 
  
          if (roles_id === "accountexec") {
              employee = new Engineer (first_name, last_name, roles_id, manager_id);
  
           } else if (roles_id === "scientist") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);

           } else if (roles_id === "accountant") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);  

           } else if (roles_id === "engineer") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);  
              
           } else if (roles_id === "attorney") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);   

           } else if (roles_id === "recruiter") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);  
           }
          // pushes newly built employee to employArray
          employArray.push(employee); 
  
          if (buildEmployeeConfirm) {
              return buildEmployee(employArray); 
          } else {
              return employArray;
          }
      })
  
  };


  
  
  // If user chooses not to buildEmployee then data is pushed to DB 
  const sql = data => {
    const params = [req.params.id];
      fs.post('/employee/:id', data, err => {
            if (err) {
              console.log(err);
              return;
          } else {
              console.log('Updated database, result "OK"')
          }
      })
  }; 
  
  buildManager()
  // callback to execute when the Promise is resolved.
    .then(buildEmployee)
    .then(employArray => {
  // callback to execute when the Promise is rejected.      
      return renderDB(employArray);
    })
    .then(finalHTML => {
   // Promise for the completion of which ever callback is executed     
      return updateDB(finalDB);
    })
    .catch(err => {
   console.log(err);
    });
  
 
 
 
 
  // --------------------------------------------------------- //
// pulled from the apiRoute files I deleted earlier

  // department routes //
//   const express = require('express');
// const app = express.app();
// const db = require('../../db/connection');

// GET all department //
app.get('/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  // GET a single department
  app.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM department WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

  //   Delete department
//   Building a delete route will give us an opportunity to test the ON DELETE SET NULL constraint effect through the API.
//   Because the intention of this route is to remove a row from the table, we should use app.delete() instead of app.get().
app.delete('/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
        // checks if anything was deleted
      } else if (!result.affectedRows) {
        res.json({
          message: 'department not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

  module.exports = app;
  // end department routes //

  // employee routes //

  

// const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

  // GET all the employees
  // originally app.get('/api/employees')
  app.get('/employees', (req, res) => {
    const sql = `SELECT employees.*, department.name 
             AS department_name 
             FROM employees 
             LEFT JOIN department 
             ON employees.department_id = department.id`;
    
db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// GET a single employee
// originally app.get('/api/employee/:id')
app.get('/employee/:id', (req, res) => {
    const sql = `SELECT employees.*, department.name 
             AS department_name 
             FROM employees 
             LEFT JOIN department 
             ON employees.department_id = department.id 
             WHERE department.id = ?`;
// Note that we were still able to use a WHERE clause with a JOIN, but we had to place it at the end of the statement
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });


  // Delete an employee
//   The endpoint used here also includes a route parameter to uniquely identify the employee to remove. 
// originally app.delete('/api/employee/:id')
app.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
//   we're using a prepared SQL statement with a placeholder. We'll assign the req.params.id to params 
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
// What if the user tries to delete a employee that doesn't exist? That's where the else if statement comes in. 
// If there are no affectedRows as a result of the delete query, that means that there was no employee by that id. 
// Therefore, we should return an appropriate message to the client, such as "Employee not found".        
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
//   The JSON object route response will be the message "deleted", with the changes property set to result.affectedRows. Again, this will verify whether any rows were changed.          
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

  // Create an Employee
  // originally app.post('/api/employee')
  app.post('/employee', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'first_name',
      'last_name',
      'manager_id',
      'roles_id'
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    //   Database call
// there is no column for the id. MySQL will autogenerate the id and relieve us of the responsibility to know which id is available to populate.
  const sql = `INSERT INTO employees (first_name, last_name, manager_id, roles_id)
  VALUES (?,?,?)`;
//  The params assignment contains three elements in its array that contains the user data collected in req.body.
const params = [body.first_name, body.last_name, body.manager_id, body.roles_id];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
   });
  });
});

// Update an employee's department
// originally app.put('/api/employee/:id')
app.put('/employee/:id', (req, res) => {
    // employee is allowed to not have department affiliation
    const errors = inputCheck(req.body, 'department_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `UPDATE employees SET department_id = ? 
                 WHERE id = ?`;
    const params = [req.body.department_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  module.exports = app;

  // end of employee routes //

  // manager routes //

  // const express = require('express');

// const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

  // GET all the managers
  // originally app.get('/api/managers')
  function something ()
  app.get('/managers', (req, res) => {
    const sql = `SELECT managers.*, department.name 
             AS department_name 
             FROM managers 
             LEFT JOIN department 
             ON managers.department_id = department.id`;
    
db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// GET a single manager
// originally app.get('/api/manager/:id')
function something ()
app.get('/manager/:id', (req, res) => {
    const sql = `SELECT managers.*, department.name 
             AS department_name 
             FROM managers 
             LEFT JOIN department 
             ON managers.department_id = department.id 
             WHERE managers.id = ?`;
// Note that we were still able to use a WHERE clause with a JOIN, but we had to place it at the end of the statement
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });


  // Delete a manager
//   The endpoint used here also includes a route parameter to uniquely identify the manager to remove. 
// originally app.delete('/api/manager/:id')
function something ()
app.delete('/manager/:id', (req, res) => {
    const sql = `DELETE FROM managers WHERE id = ?`;
//   we're using a prepared SQL statement with a placeholder. We'll assign the req.params.id to params 
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
// What if the user tries to delete a manager that doesn't exist? That's where the else if statement comes in. 
// If there are no affectedRows as a result of the delete query, that means that there was no manager by that id. 
// Therefore, we should return an appropriate message to the client, such as "manager not found".        
      } else if (!result.affectedRows) {
        res.json({
          message: 'manager not found'
        });
      } else {
//   The JSON object route response will be the message "deleted", with the changes property set to result.affectedRows. Again, this will verify whether any rows were changed.          
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

  // Create a manager
  // originally app.post('/api/manager')
  function something ()
  app.post('/manager', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'first_name',
      'last_name'
      
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    //   Database call
// there is no column for the id. MySQL will autogenerate the id and relieve us of the responsibility to know which id is available to populate.
  const sql = `INSERT INTO managers (first_name, last_name, manager_id, roles_id)
  VALUES (?,?,?)`;
//  The params assignment contains three elements in its array that contains the user data collected in req.body.
const params = [body.first_name, body.last_name, body.manager_id, body.roles_id];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
   });
  });
});

// Update a manager's department
// originally app.put('/api/manager/:id')
function something ()
app.put('/manager/:id', (req, res) => {
    // manager is allowed to not have department affiliation
    const errors = inputCheck(req.body, 'department_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `UPDATE managers SET department_id = ? 
                 WHERE id = ?`;
    const params = [req.body.department_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'manager not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  module.exports = app;

  // end of manager routes //

  // role routes //

 
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

app.get('/roles', (req, res) => {
    // data returned in alphabetical order by last name.
    const sql = `SELECT * FROM roles ORDER BY last_name`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows,
      });
    });
  });

  // Get single role
app.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

  app.post('/role', ({ body }, res) => {
     // Data validation
const errors = inputCheck(body, 'first_name', 'last_name', 'manager_id', 'department_id');
if (errors) {
  res.status(400).json({ error: errors });
  return;
}
//   The ? prepared statements will protect us from malicious data
    const sql = `INSERT INTO roles (first_name, last_name, manager_id, department_id) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.manager_id, body.department_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });

//   update manager
  app.put('/manager/:id', (req, res) => {
    // Data validation
    const errors = inputCheck(req.body, 'manager');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `UPDATE roles SET department = ? WHERE id = ?`;
    const params = [req.body.manager, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'role not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

//   delete role
  app.delete('/role/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
  
    db.query(sql, req.params.id, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'role not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

  module.exports = app;

  // end of role routes //

  generateDB = (data) => {

    profileArray = []; 

    for (let i = 0; i < data.length; i++) {
        const employee = data[i];
        const role = employee.getRole(); 

        if (roles === 'manager') {
            const managerProfile = createManager(employee);
            profileArray.push(employeesTable);
        }

        if (role === 'accountexec') {
            const engineerProfile = createEngineer(employee);
            profileArray.push(employeesTable);
        }

        if (role === 'scientist') {
            const internProfile = createIntern(employee);
            profileArray.push(employeesTable);
        }

        if (role === 'accountant') {
          const internProfile = createIntern(employee);
          profileArray.push(employeesTable);
        }

        if (role === 'engineer') {
          const internProfile = createIntern(employee);
          profileArray.push(employeesTable);
        }

        if (role === 'attorney') {
          const internProfile = createIntern(employee);
          profileArray.push(employeesTable);
        }
        
        if (role === 'recruiter') {
          const internProfile = createIntern(employee);
          profileArray.push(employeesTable);
        }
    }

    
    // Records in the array are joined so the data can be rendered in the DB
    const employeeRecords = profileArray.join('')

    const renderEmployees = renderEmployeesTable(employeeRecords); 
    return renderEmployees;

}

// creating the index file with all the teammembers' Records 
const renderDB = function (employeeRecords) {   


  
}
module.exports = app;