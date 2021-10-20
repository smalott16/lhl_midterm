/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { categoryEngine } = require('../categorizer/category-engine');

const app = express();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        const userID = req.cookies['user_id'];
        const templateVars = { user: userID };

        res.render("lists", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/:id', (req, res) => {

    const categoryName = req.params.id;
    const userID = req.cookies['user_id'];

    const qryString = (`
    SELECT users.id as user_id, users.name as name, categories.name as category_name, items.name as item_name, items.id AS item_id, items.completed as completed
    FROM users
    JOIN lists ON users.id = user_id
    JOIN items ON lists.id = list_id
    JOIN categories ON categories.id = category_id
    WHERE categories.name = $1
    ORDER BY items.completed;
    `)

    db.query(qryString, [categoryName])
      .then((response) => {
        let listItems = response.rows;

        const templateVars = { listItems, categoryName, userID}
        res.render("categories", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const formInput = req.body.text;
    const userID = req.cookies['user_id'];

    categoryEngine(formInput)
      .then((categoryName) => {
        const qryString = `
        INSERT INTO items (name, list_id)
        VALUES ($1, (
          SELECT lists.id FROM lists
          JOIN categories ON category_id = categories.id
          WHERE user_id = $2 AND categories.name = $3));`

        db.query(qryString, [formInput, userID, categoryName])
          .then(() => {
            console.log('we make it here')
            res.redirect(`/lists/`);
        })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })
  });

  router.post('/:id', (req, res) => {
    const categoryName = req.params.id;
    const formInput = req.body.text;
    console.log("OH NOOOOO!")
    const userID = req.cookies['user_id'];

    const qryString = `
    INSERT INTO items (name, list_id)
    VALUES ($1, (
      SELECT lists.id FROM lists
      JOIN categories ON category_id = categories.id
      WHERE user_id = $2 AND categories.name = $3));`

    db.query(qryString, [formInput, userID, categoryName])
      .then((response) => {

        res.redirect(`/lists/${categoryName}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/:id/:categoryName/delete', (req, res) => {
    const itemID = req.params.id;
    const categoryName = req.params.categoryName;

    qryString = `
    DELETE FROM items WHERE items.id = $1;
    `
    db.query(qryString, [itemID])
      .then((result) => {
        res.redirect(`/lists/${categoryName}`);
      })
      .catch (err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/:id/:categoryName/complete', (req, res) => {
    console.log(req.params.id, req.params.categoryName);
    const itemID = req.params.id;
    const categoryName = req.params.categoryName;

    const qryString = `
    UPDATE items
    SET completed = TRUE
    WHERE items.id = $1;
    `

    db.query(qryString, [itemID])
      .then((result) => {
        res.redirect(`/lists/${categoryName}`);
      })
      .catch (err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.post('/logout', (req, res) => {


  //     const userID = req.cookies['user_id'];
  //     res.clearCookie('user_id');
  //     res.redirect('lists/login');

  // })
  router.post('/reassign/:categoryName/:item_id', (req, res) => {
    const categoryName = req.params.categoryName;
    const itemID = req.params.item_id;

    const qryString = `
    UPDATE items
    SET list_id = (SELECT lists.id FROM lists
      JOIN categories ON categories.id = category_id
      WHERE categories.name = $1)
    WHERE items.id = $2;
    `

    db.query(qryString, [categoryName, itemID])
      .then((result) => {
        res.redirect(`/lists`)
      })

  })

  return router;

};


