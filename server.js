 const express = require('express');

const db = require('./db/connection');

const inquirer = require('inquirer');

// const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);
 
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

  // --------------------------------------------------------- //

  // pulled from connection.js
  const mysql = require('mysql2');

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

  // --------------------------------------------------------- //
// pulled from the apiRoute files

  // division routes //
  const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET all divisions
router.get('/divisions', (req, res) => {
    const sql = `SELECT * FROM divisions`;
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

  // GET a single division
  router.get('/division/:id', (req, res) => {
    const sql = `SELECT * FROM divisions WHERE id = ?`;
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

  //   Delete divisions
//   Building a delete route will give us an opportunity to test the ON DELETE SET NULL constraint effect through the API.
//   Because the intention of this route is to remove a row from the table, we should use app.delete() instead of app.get().
router.delete('/division/:id', (req, res) => {
    const sql = `DELETE FROM divisions WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
        // checks if anything was deleted
      } else if (!result.affectedRows) {
        res.json({
          message: 'Division not found'
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
  // end division routes //

  // employee routes //

  const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

  // GET all the employees
  // originally app.get('/api/employees')
  router.get('/employees', (req, res) => {
    const sql = `SELECT employees.*, divisions.name 
             AS division_name 
             FROM employees 
             LEFT JOIN divisions 
             ON employees.division_id = divisions.id`;
    
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
    const sql = `SELECT employees.*, divisions.name 
             AS division_name 
             FROM employees 
             LEFT JOIN divisions 
             ON employees.division_id = divisions.id 
             WHERE divisions.id = ?`;
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

// Update an employee's division
// originally app.put('/api/employee/:id')
router.put('/employee/:id', (req, res) => {
    // employee is allowed to not have division affiliation
    const errors = inputCheck(req.body, 'division_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `UPDATE employees SET division_id = ? 
                 WHERE id = ?`;
    const params = [req.body.division_id, req.params.id];
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
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

  // GET all the managers
  // originally app.get('/api/managers')
  router.get('/managers', (req, res) => {
    const sql = `SELECT managers.*, divisions.name 
             AS division_name 
             FROM managers 
             LEFT JOIN divisions 
             ON managers.division_id = divisions.id`;
    
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
    const sql = `SELECT managers.*, divisions.name 
             AS division_name 
             FROM managers 
             LEFT JOIN divisions 
             ON managers.division_id = divisions.id 
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
      'last_name',
      'industry_connected'
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

// Update a manager's division
// originally app.put('/api/manager/:id')
router.put('/manager/:id', (req, res) => {
    // manager is allowed to not have division affiliation
    const errors = inputCheck(req.body, 'division_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `UPDATE managers SET division_id = ? 
                 WHERE id = ?`;
    const params = [req.body.division_id, req.params.id];
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

  const express = require('express');
const router = express.Router();
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
const errors = inputCheck(body, 'first_name', 'last_name', 'manager_id', 'division_id');
if (errors) {
  res.status(400).json({ error: errors });
  return;
}
//   The ? prepared statements will protect us from malicious data
    const sql = `INSERT INTO roles (first_name, last_name, manager_id, division_id) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.manager_id, body.division_id];
  
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
  
    const sql = `UPDATE roles SET email = ? WHERE id = ?`;
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

  



