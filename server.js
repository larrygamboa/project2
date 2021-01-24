// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// ========== NODEMAILER ========== //
const transporter = nodemailer.createTransport({
  // host: "smtp-mail.outlook.com",
  // secureConnection: false,
  // port: 587,
  // logger: true,
  // debug: true,

  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
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

// verify connection configuration
transporter.verify(function(error, success) {
  if (success) {
    console.log("verification success");
  } else {
    console.log("error", error);
  }
});

const mailOptions = {
  from: "codebasicsonlineportal@gmail.com", // sender address (who sends)
  to: 'feelthehousegroove@yahoo.com, ivan_e21@hotmail.com', // list of receivers (who receives)
  subject: "Welcome to CODEBASICS.COM", // Subject line
  text: "Hello world, this is the first email", // plaintext body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: " + info.response);
});

app.post("/", (req, res) => {
  db.User.create({
    // email: req.body.email,
    // password: req.body.password,
    // firstName: req.body.firstName,
    // lastName: req.body.lastName,
    
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })
    .then(() => {
      res.redirect(307, "/api/signup");
      const mailOptions = {
        from: "codebasicsonlineportal@gmail.com",
        to: req.body.email,
        subject: "Welcome to CODEBASICS.COM",
        text: "Hello world, this is the first email",
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log("Error has occured");
        } else {
          console.log("Email Sent");
        }
      });
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});
// ========== END NODEMAILER ========== //

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
