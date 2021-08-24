const homeLogin = (req, res) => {
  res.render("login.ejs");
};

const homePage = (req, res) => {
  console.log(req);
  res.render("home.ejs", { name: req.user.fullname });
};

const logout = (req, res) => {
  req.logout();

  console.log("Logout successfully");
  res.redirect("/");
};

module.exports = { homeLogin, homePage, logout };
