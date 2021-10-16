/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        // res.json({ users });
        // res.send('This is the home lists page!')
        res.render("lists");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/:id', (req, res) => {
    db.query('SELECT * FROM users;')
      .then((response) => {
        // res.json(response.rows[0])
        res.send('Specific category list page.')
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post('/:id', (req, res) => {
    res.redirect("/lists/:id");
  });

  return router;
};
