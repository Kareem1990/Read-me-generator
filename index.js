// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require("./utils/generateMarkdown.js");
const fs = require('fs');


// TODO: Create an array of questions for user input
const questions =  [ 
        {  //project name
            type: 'input',
            name: 'name',
            message: 'What is your name of the project? (Required)',
            validate: nameInput => {
            if (nameInput) {
            return true;
            } else {
            console.log('Please enter the name of the project!');
            return false;
            }
          } 
        },
        {  //description
            type: 'input',
            name: 'description',
            message: 'What is the description of the project?',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter the project description');
                    return false;
                }
            }
       },
  
       { //Installation
        type: 'input',
        name: 'installation',
        message: 'Please, provide the installation instructions for the project',
       },

       {  //Usage information
        type: 'input',
        name: 'usage',
        message: 'Provide usage instructions for the project',
       },

      {//tests
        type: 'input',
        name: 'tests',
        message: 'Please provide the test instructions',
      },

      {//contribution guidelines
        type: 'input',
        name: 'usage',
        message: 'Please provide the contribution guidlines.',
      },


      { type: 'list',
        name: 'license',
        message: 'What kind of license do you like?',
        choices: ['Apache 2.0', 'Boost Software 1.0', 'BSD 3-Clause', 'BSD 2-Clause', 'MIT', 'GPL-3.0']
      },

      {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username (Required)",
        validate: (githubInput) => {
          if (githubInput) {
            return true;
          } else {
            console.log("Please enter your GitHub username");
            return false;
          }
        },
      },
    ]

//     promptUser();
// TODO: Create a function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/generated-README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};
  
  const init = () => {

    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
}

// Function call to initialize app
init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
})
