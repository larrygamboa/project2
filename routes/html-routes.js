// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
var user = require('../models/user.js');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      var hbsObject = {name: 'vanilla', price: 10, awesomeness: 3};
      res.render('members', hbsObject);
      // res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    // user.findOne(function(data) {
      var hbsObject = {name: 'vanilla', price: 10, awesomeness: 3};
      res.render('members', hbsObject);
    
    // res.sendFile(path.join(__dirname, "../public/layout/members.handlebars"));
  });
};
