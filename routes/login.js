/*
 * All login routes are defined here
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.cookies['user_id'];
    const templateVars = {user: userID};
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    const qryString = `
    SELECT id FROM users
    WHERE email = $1;`
    db.query(qryString, [req.body.email])
      .then((results) => {
        res.cookie('user_id', results.rows[0].id);
        res.redirect("/lists");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  return router;
};
