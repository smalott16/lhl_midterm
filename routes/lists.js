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
    //if we had more than one user, we would need to join on users table
    const userID = req.cookies['user_id'];
    const qryString = `
    SELECT lists.category_id as category_id, count(items.id) as item_count
    FROM items
    JOIN lists ON lists.id = list_id
    JOIN users ON users.id = lists.user_id
    WHERE users.id = $1
    GROUP BY lists.category_id
    ORDER BY lists.category_id;
    `
    db.query(qryString, [userID])
      .then(data => {

        let itemCount = [];
        if (userID) {
          itemCount = data.rows;
        }

        const templateVars = { user: userID, itemCount };

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
    SELECT users.id as user_id, users.name as name, categories.name as category_name,
    items.name as item_name, items.id AS item_id, items.completed as completed, items.priority as priority
    FROM users
    JOIN lists ON users.id = user_id
    JOIN items ON lists.id = list_id
    JOIN categories ON categories.id = category_id
    WHERE categories.name = $1 AND users.id = $2
    ORDER BY items.completed, items.priority DESC;
    `)

    db.query(qryString, [categoryName, userID])
      .then((response) => {
        let listItems = response.rows;
        const templateVars = { listItems, categoryName, user: userID}
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
    const itemID = req.params.id;
    const categoryName = req.params.categoryName;

    const qryString = `
    UPDATE items
    SET completed = TRUE, priority = FALSE
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

  router.post('/priority/:id/:categoryName/:priority', (req, res) => {
    const itemID = req.params.id;
    const categoryName = req.params.categoryName;
    let priority = req.params.priority;


    console.log('before', typeof priority, priority);

    //comes in as a string, so !priority is always true.
    if (priority === 'false') {
      priority = true;
    } else {
      priority = false;
    }

    console.log('after ', typeof priority, priority);

    const qryString = `
    UPDATE items
    SET priority = $2
    WHERE items.id = $1;
    `

    db.query(qryString, [itemID, priority])
      .then((result) => {
        res.redirect(`/lists/${categoryName}`);
      })
      .catch (err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

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
      .catch (err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

    return router;
  };


