const mysql = require('mysql2');


const inquirer = require('inquirer');


const PORT = process.env.PORT || 3001;


  // pulled from connection.js
  
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

//  team-profile-generator code --

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
  
      
  // CREDIT: Nathan Szurek (Tutor), Calvin Freese (TA), Kelsey Gasser (TA) Brian Wilde (Classmate)
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
              type: 'list',
              name: 'role',
              message: "Please select their role",
              choices: ['Engineer', 'Intern']
          },
          {
              type: 'input',
              name: 'name',
              message: "Please enter the employee's full name", 
          },
  
          {
              type: 'input',
              name: 'id',
              message: "Please enter their employee ID.",
          },
  
          {
              type: 'input',
              name: 'email',
              message: "Please enter the employee's email address.",
          },
  
          {
              type: 'input',
              name: 'github',
              message: "Please enter their Github username.",
              when: (input) => input.role === "Engineer",
          },
          
          {
              type: 'input',
              name: 'school',
              message: "What school is the intern attending?",
              when: (input) => input.role === "Intern",
          },
  
          {
              type: 'confirm',
              name: 'buildEmployeeConfirm',
              message: 'Add another teammate?',
          }
      ])
      .then(userInput => {
          // Selects the data sets for each employee class
  
          let { name, id, email, role, github, school, buildEmployeeConfirm } = userInput; 
          let employee; 
  
          if (role === "Engineer") {
              employee = new Engineer (name, id, email, github);
  
           } else if (role === "Intern") {
              employee = new Intern (name, id, email, school);
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
  
  
  // If user chooses not to buildEmployee then index file is written 
  const writeFile = data => {
      fs.writeFile('./dist/index.html', data, err => {
            if (err) {
              console.log(err);
              return;
          } else {
              console.log("Check out your spiffy new index.html file!")
          }
      })
  }; 
  
  buildManager()
  // callback to execute when the Promise is resolved.
    .then(buildEmployee)
    .then(employArray => {
  // callback to execute when the Promise is rejected.      
      return generateHTML(employArray);
    })
    .then(finalHTML => {
   // Promise for the completion of which ever callback is executed     
      return writeFile(finalHTML);
    })
    .catch(err => {
   console.log(err);
    });
  
 
 
 
 
  // --------------------------------------------------------- //
// pulled from the apiRoute files

  // department routes //
//   const express = require('express');
// const router = express.Router();
// const db = require('../../db/connection');

// GET all department //
router.get('/department', (req, res) => {
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
  router.get('/department/:id', (req, res) => {
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
router.delete('/department/:id', (req, res) => {
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

  module.exports = router;
  // end department routes //

  // employee routes //

  

const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

  // GET all the employees
  // originally app.get('/api/employees')
  router.get('/employees', (req, res) => {
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
router.get('/employee/:id', (req, res) => {
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
router.delete('/employee/:id', (req, res) => {
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
  router.post('/employee', ({ body }, res) => {
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
router.put('/employee/:id', (req, res) => {
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

  module.exports = router;

  // end of employee routes //

  // manager routes //

  // const express = require('express');

const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

  // GET all the managers
  // originally app.get('/api/managers')
  router.get('/managers', (req, res) => {
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
router.get('/manager/:id', (req, res) => {
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
router.delete('/manager/:id', (req, res) => {
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
  router.post('/manager', ({ body }, res) => {
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
router.put('/manager/:id', (req, res) => {
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

  module.exports = router;

  // end of manager routes //

  // role routes //

 
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/roles', (req, res) => {
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
router.get('/role/:id', (req, res) => {
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

  router.post('/role', ({ body }, res) => {
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
  router.put('/manager/:id', (req, res) => {
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
  router.delete('/role/:id', (req, res) => {
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

  module.exports = router;

  // end of role routes //

  



