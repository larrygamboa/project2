// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
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
    db.Topics.findAll({}).then(function(dbTopics) {
      db.Activities.findAll({}).then(function(dbActivities) { 
           res.render("members", {Topics: dbTopics, Activities: dbActivities})
      })
  });
  });


  app.post("/api/insertTopic", function(req, res) {
    db.Topics.create({topic_name: req.body.name, t_condition: false}).then(function() {
        res.redirect("/members");
      });
  });
  
  app.post("/api/insertActivity", function(req, res) {
    db.Activities.create({activity_name: req.body.name, a_condition: false}).then(function() {
        res.redirect("/members");
      });
  });

 
  app.put("/api/updateTopic/:id", function(req, res) {
    db.Topics.update(
      {t_condition: true},
      {
        where: {
          id: req.params.id
        }
      }).then(function() {
       
        res.sendStatus(200);
    });
  });


  app.put("/api/updateActivity/:id", function(req, res) {
    db.Activities.update(
      {a_condition: true},
      {
        where: {
          id: req.params.id
        }
      }).then(function() {
       
        res.sendStatus(200);
    });
  });
};

