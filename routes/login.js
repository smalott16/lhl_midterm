/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
//const cookieSession = require('cookie-session');

// app.use(cookieSession({
//   name: 'session',
//   keys: ['secretKeyOne', 'secretkeyTwo'],
// }));

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
