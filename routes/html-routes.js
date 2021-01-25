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
    db.Html.findAll({}).then(function(dbHtml) {
      db.Css.findAll({}).then(function(dbCss) { 
                  db.Python.findAll({}).then(function(dbPython) {
                         db.Php.findAll({}).then(function(dbPhp) {
           res.render("members", {Html: dbHtml, Css: dbCss, Python: dbPython, Php: dbPhp})
      })
    })
  }) 
  });
  });


  app.post("/api/insertHtml", function(req, res) {
    db.Html.create({html_name: req.body.name, html_condition: false}).then(function() {
        res.redirect("/members");
      });
  });
  
  app.post("/api/insertCss", function(req, res) {
    db.Css.create({css_name: req.body.name, css_condition: false}).then(function() {
        res.redirect("/members");
      });
  });

  app.post("/api/insertPhp", function(req, res) {
    db.Php.create({php_name: req.body.name, php_condition: false}).then(function() {
        res.redirect("/members");
      });
  });

  app.post("/api/insertPython", function(req, res) {
    db.Python.create({python_name: req.body.name, python_condition: false}).then(function() {
        res.redirect("/members");
      });
  });

 
  app.put("/api/updateHtml/:id", function(req, res) {
    db.Html.update(
      {html_condition: true},
      {
        where: {
          id: req.params.id
        }
      }).then(function() {
       
        res.sendStatus(200);
    });
  });


  app.put("/api/updateCss/:id", function(req, res) {
    db.Css.update(
      {css_condition: true},
      {
        where: {
          id: req.params.id
        }
      }).then(function() {
       
        res.sendStatus(200);
    });
  });

  app.put("/api/updatePhp/:id", function(req, res) {
    db.Php.update(
      {php_condition: true},
      {
        where: {
          id: req.params.id
        }
      }).then(function() {
       
        res.sendStatus(200);
    });
  });

  app.put("/api/updatePython/:id", function(req, res) {
    db.Python.update(
      {python_condition: true},
      {
        where: {
          id: req.params.id
        }
      }).then(function() {
       
        res.sendStatus(200);
    });
  });

};

