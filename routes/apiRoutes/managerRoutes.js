const express = require('express');
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