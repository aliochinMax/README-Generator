const inquirer = require('inquirer');
function runInitalQuestions(){
    inquirer
    .prompt([
        {
        type: 'input', //Allows any text input
        message: 'What is your username?', //Input's prompt
        name: 'username', //name of variable
        },
        {
        type: 'input', //Allows any text input
        message: 'What is your Repository name?', //Input's prompt
        name: 'reponame', //name of variable
        },
        {
        type: 'checkbox', //inquirer's built in system, allows multiple choices, returns as an array 
        message: 'What contents do you wish to include', 
        choices: ['Description', 'How to use', 'How to contribute', 'Table of contents', 'Screenshots of use', 'Screenshots of development', 'Development diary'], //The choices the user can select from, If this was a real application (for some reason), other would then display an input box to add another langauge but it isnt so it dont.
        name: 'contents',
        loop:'true', // Makes it so once the user scrolls to the bottom, it loops back to the top 
        },
        {
        type: 'list', //inquirer's built in system, allows a single choice
        message: 'License to use',
        choices: ['MIT','Apache 2.0','CCO','BSD 3-Clause License','Boost Software License 1.0', 'Eclipse Public License', 'GNU GPL v3', 'GNU FDL v1.3', 'GNU LGPL v3', 'GNU APGL v3'],
        name: 'license',
        },
    ])
    .then((response) =>
        response.username.trim() != "" && response.reponame.trim() != "" && response.license != ""  //Checks if any of the required fields are left empty
        ?(console.log(response), contentQuestionnare())
        :(console.log("Hey fill out all the fields you dummy"), runInitalQuestions()) //If a required field left empty, polietly tell the user that they need to fill all fields and re-run the function/program
        //Previous attempts (key:{code}, error returned) for line above include {console.log("Hey fill out all the fields you dummy"), runQuestionnare()} Made runQuestionnare run repeatedly until it crashed and {console.log("Hey fill out all the fields you dummy") && runQuestionnare()} Spat out a syntax error
        );
};

function contentQuestionnare(contentArr){
    const contentQuestionPrompts =
    {
        description: {
            type: "input",
            message: "Write a short description for your project",
            name: "description"
        },
        howToUse:{
            type: "input",
            message: "How do the users use your project, how do they set it up?",
            name:"howToUse"
        },
        howToContribute:{
            type: "input",
            message: "What's the process to contribute to your project?",
            name:"howToContribute"
        },
        developmentDiary:{
            type:"input",
            message:"Detail your development process",
            name:"developmentDiary"
        }
    }
    inquirer
    .prompt(
        [
            contentQuestionPrompts.description,
            contentQuestionPrompts.howToUse,
            contentQuestionPrompts.howToContribute,
            contentQuestionPrompts.developmentDiary
        ]
    ).then((response) => 
      console.log(response)  
      );
}


runInitalQuestions();