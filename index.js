const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const generateHTML = require('./generateHTML');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "color",
      message: "What is your favorite color: pink, green, blue, purple? "
    },

    {
      type: "input",
      name: "username",
      message: "What is your github username?"
    }

  ])

    .then(function ({ username }) {
      const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

      axios.get(queryUrl).then(function (res) {
        profileImage = res.data.avatar_url;
        userName = res.data.login;
        userLocation = res.data.location;
      });



      fs.writeFile("developer.html", function (err) {
        if (err) {
          throw err;
        }

        // console.log(`Saved ${repoNames.length} repos`);
      })

    })
}

function genHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
    <body>

    <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Fluid jumbotron</h1>
    <img src= "${profileImage}">
    <br>
    <h1> Hi! <br> My name is "${userName}"</h1>
    <p> Currently @ "${userLocation}"</p>
  </div>
</div>

<h2> "${userBio}"</h2>
<div class="card col-sm-4">
  <div class="card-body">
   <h1>Public Repositories</h1><br>
   <p> "${pubRepo}"</p>
  </div>
</div>
<div class="card col-sm-4">
  <div class="card-body">
  <h1>Followers</h1><br>
  <p> "${followers}"</p>
  </div>
</div>
<div class="card col-sm-4">
  <div class="card-body">
  <h1>GitHub Stars</h1><br>
  <p> "${gitStars}"</p>
  </div>
</div>
<div class="card col-sm-4">
  <div class="card-body">
  <h1>Following</h1><br>
  <p> "${following}"</p>
  </div>
</div>

        


    </body>`
}


promptUser()
  .then(function (answers) {
    const html = genHTML(answers);

    return writeFileAsync("developer.html", html);
  })
  .then(function () {
    console.log("Successfully wrote to developer.html");
  })
  .catch(function (err) {
    console.log(err);
  });




// function init() {
// }
// init();