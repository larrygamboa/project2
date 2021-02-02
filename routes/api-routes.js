// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
// Requiring custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// creating transporter variable for nodemailer function
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: true,
    ciphers: "SSLv3",
  },
});

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely
  //  If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    // grabing data stored in topics tables to populate members page
    db.Html.findAll({}).then(function(dbHtml) {
      db.Css.findAll({}).then(function(dbCss) {
        db.Python.findAll({}).then(function(dbPython) {
          db.Php.findAll({}).then(function(dbPhp) {
            res.render("members", {
              Html: dbHtml,
              Css: dbCss,
              Python: dbPython,
              Php: dbPhp,
            });
          });
        });
      });
    });
  });

  // routes to insert new topics
  app.post("/api/insertHtml", function(req, res) {
    db.Html.create({ html_name: req.body.name, html_condition: false }).then(
      function() {
        res.redirect("/members");
      }
    );
  });

  app.post("/api/insertCss", function(req, res) {
    db.Css.create({ css_name: req.body.name, css_condition: false }).then(
      function() {
        res.redirect("/members");
      }
    );
  });

  app.post("/api/insertPhp", function(req, res) {
    db.Php.create({ php_name: req.body.name, php_condition: false }).then(
      function() {
        res.redirect("/members");
      }
    );
  });

  app.post("/api/insertPython", function(req, res) {
    db.Python.create({
      python_name: req.body.name,
      python_condition: false,
    }).then(function() {
      res.redirect("/members");
    });
  });

  // routes to update the condition of the topics to move them to "complete" section
  app.put("/api/updateHtml/:id", function(req, res) {
    db.Html.update(
      { html_condition: true },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(function() {
      res.sendStatus(200);
    });
  });

  app.put("/api/updateCss/:id", function(req, res) {
    db.Css.update(
      { css_condition: true },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(function() {
      res.sendStatus(200);
    });
  });

  app.put("/api/updatePhp/:id", function(req, res) {
    db.Php.update(
      { php_condition: true },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(function() {
      res.sendStatus(200);
    });
  });

  app.put("/api/updatePython/:id", function(req, res) {
    db.Python.update(
      { python_condition: true },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(function() {
      res.sendStatus(200);
    });
  });

  // ========== NODEMAILER ========== //

  // verify connection configuration
  transporter.verify(function(error, success) {
    if (success) {
      console.log("verification success");
    } else {
      console.log("error", error);
    }
  });

  // routes to gather entered info to send the email
  app.post("/api/mailer", (req, res) => {
    const mailOptions = {
      from: req.body.email,
      to: "codebasicsonlineportal@gmail.com",
      subject: "Welcome to CODEBASICS",
      text: req.body.message,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log("Error has occured");
      } else {
        console.log("Email Sent");
      }
    });

    res.json({
      success: true,
    });
  });
  // ========== END NODEMAILER ========== //
};
