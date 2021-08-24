if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const passport = require("passport");
const express = require("express");
const session = require("express-session");

const facebook_initialize = require("./Auth/fb_passport_config");
const { homeLogin, homePage } = require("./controllers/index");
const router = require("./Routes/index");

const app = express();

facebook_initialize(passport);

/**
 * * serving your static using the directory styles
 */
app.use(express.static(__dirname + "/styles"));

//app.use(session(...)) must comes before app.user(passport.session())
//other wise items will not be save to session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("", router);

//help to render our ejs with values
app.set("view-engine", "ejs");

app.listen("3000");
