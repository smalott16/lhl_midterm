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
    let query = `SELECT * FROM users`;
    db.query(query)
      .then(data => {
        const users = data.rows;
        // res.json({ users });
        res.render("login");
        //res.send('This is the login page!')
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    console.log(req.session);
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
