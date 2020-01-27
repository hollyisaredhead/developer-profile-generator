const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

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
          const repoNames = res.data.map(function (repo) {
            return repo.name;
          });
    
          const repoNamesStr = repoNames.join("\n");
    
          fs.writeFile("developer.txt", repoNamesStr, function (err) {
            if (err) {
              throw err;
            }
    
            console.log(`Saved ${repoNames.length} repos`);
          })
        
        })
      })
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">

    </ul>
  </div>
</div>
</body>
</html>`;
}

  
    promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("developer.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to developer.html");
  })
  .catch(function(err) {
    console.log(err);
  });




// function init() {
// }
// init();