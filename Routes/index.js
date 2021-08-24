const express = require("express");
const router = express.Router();
const { homeLogin, homePage, logout } = require("../controllers/index");
const passport = require("passport");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    next();
  }
};

const isLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/", isLoggedIn, homeLogin);
router.get("/home", isLoggedOut, homePage);
router.get("/logout", logout);

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
);

module.exports = router;
