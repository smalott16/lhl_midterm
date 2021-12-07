// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const morgan = require("morgan");


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//middleware
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
const listsRoutes = require("./routes/lists");
const loginRoutes = require("./routes/login");

// //all list page for logged in
app.use("/lists", listsRoutes(db));

// //login page
app.use("/login", loginRoutes(db));

//Root - route to home
app.get("/", (req, res) => {
  const userID = req.cookies['user_id'];
    const templateVars = {user: userID};
  res.render("login", templateVars);
});

//has to be in server file to use /logout pathway without adding on to login/lists.
app.post('/logout', (req, res) => {
    const userID = req.cookies['user_id'];
    res.clearCookie('user_id');
    res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
