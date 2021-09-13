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