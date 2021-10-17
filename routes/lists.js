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

    const categoryID = req.params.id;
    console.log(categoryID);

    const qryString = (`
    SELECT users.id as user_id, users.name as name, categories.name as category_name, items.name as item_name
    FROM users
    JOIN lists ON users.id = user_id
    JOIN items ON lists.id = list_id
    JOIN categories ON categories.id = category_id
    WHERE categories.name = $1;
    `)

    db.query(qryString, [categoryID])
      .then((response) => {
        let listItems = response.rows;
        const templateVars = { listItems, categoryID }
        res.render("categories", templateVars);
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
