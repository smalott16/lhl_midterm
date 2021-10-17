/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const app = express();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
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
    const categoryID = req.params.id;
    const formInput = req.body.text;
    console.log(req)
    const userID = req.cookies['user_id'];

    const qryString = `
    INSERT INTO items (name, list_id)
    VALUES ($1, (
      SELECT lists.id FROM lists
      JOIN categories ON category_id = categories.id
      WHERE user_id = $2 AND categories.name = $3));`

    db.query(qryString, [formInput, userID, categoryID])
      .then((response) => {

        res.redirect(`/lists/${categoryID}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  });

  return router;
};
