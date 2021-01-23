<div align="center"> <img src="http://res.cloudinary.com/muhimen/image/upload/v1604122377/student_portal_logo.png" alt="logo"> 
</div>


# Student Web Development Portal

 ## Table of Contents
  * [Description](#Description)
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [License](#License)

## Description
This application allows students to create an account by signing up with an email and a password and then log into the account to access the information about topics and activities that they can mark as "completed" and the percentage of completion will be display in the progress bar. The app implements a variety of technologies and programming languages such as JavaScript, jQuery, HTML, CSS, SQL, API requests, ORM, Ajax calls, Express.js, Node.js, Passport.js, Sequelize and Bcrypt. The repository is organized according to MVC framework standarts. This full-stack app also introduces simple and intuitive interface.

## Installation
To install this application the user will need to install Node.js and MySQL Workbench, then initialize the folder containing the application by typing `npm init -y` and `npm i` in the command line to install required dependencies such as `mysql, sequelize, fs, path, bcrypt, express, passport` mentioned in the `package.json` file that holds various metadata that's relevant to the project. Installing those modules will produce the node_modules folder that is like a cache for the external modules and Nodejs is trained to look for them there.
 <br>
To run the app on a local machine the user needs to open the Workbench first and run this sequel script:
DROP DATABASE IF EXISTS passport_demo;
CREATE DATABASE passport_demo;
Inside the folder `Config` there is a file `config.json` with a json object containing information about MySQL connection: username, password, name of the database. The name of the database is the same name has to match with the one in the Workbench, and the user has to make sure to put in his username and password to access it.


## Usage 

How the student uses the app? Login, add topics, add activities, complete then, mention progress bar and nodemailer


### Roles

Collaboration, who did what

## License
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
