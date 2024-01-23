const inquirer = require('inquirer');
const fs = require('fs');

const contentQuestions =  JSON.parse(fs.readFileSync('questions.json'));
function createLicenseBadge(license){
   return "# ![License Badge](https://shields.io/badge/license-" + license + "-green)"
};
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
            choices: ['Description', 'How to use', 'How to contribute', 'Further development' ,  'Screenshots of use', 'Screenshots of development', 'Development diary'], //The choices the user can select from, If this was a real application (for some reason), other would then display an input box to add another langauge but it isnt so it dont.
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
        ?(console.log(response), contentQuestionnare(response))
        :(console.log("Hey fill out all the fields you dummy"), runInitalQuestions()) //If a required field left empty, polietly tell the user that they need to fill all fields and re-run the function/program
        //Previous attempts (key:{code}, error returned) for line above include {console.log("Hey fill out all the fields you dummy"), runQuestionnare()} Made runQuestionnare run repeatedly until it crashed and {console.log("Hey fill out all the fields you dummy") && runQuestionnare()} Spat out a syntax error
        );
};

async function contentQuestionnare(prevResponse){ //async function to allow for await to run the inquirer prompt correctly
    let answers = []; 
    for(question of contentQuestions){
        if(prevResponse.contents.includes(question.checkString)){
            if(question.hasOwnProperty("prompt")){
                answers.push(await inquirer.prompt(question.prompt));
            }
            else{ //For screenshot sections as I'm only supporting text inputs 
                answers.push({ [question.name]: "{ADD MANUALLY}" });            }
        };
    };
    buildFile(prevResponse, answers);

}

function buildFile(initialAnswers, contentAnswers) {
    //Probably a good idea to refactor contentQuestionnare to not return an array of 1 key 1 value objects as it forces this function to use an ugly Object.keys(obj)[0] and Object.values(obj)[0] methods
    let content = `# ${initialAnswers.reponame}\n Author: ${initialAnswers.username} \n\n${createLicenseBadge(initialAnswers.license)}`;

    // Add Table of Contents
    content += '\n\n## Table of Contents\n';
    //Generates a header and header refrence for each section the user wishes to include
    for (const answer of contentAnswers) { 
        content += `- [${generateHeaderTitle(Object.keys(answer)[0])}](#${generateHeaderReference(Object.keys(answer)[0])})\n`;
    }

    //Adds header and the content for each section included
    for (const answer of contentAnswers) {
        content += `\n## ${generateHeaderTitle(Object.keys(answer)[0])}\n`; 
        content += `${Object.values(answer)[0]}`;
    }

    fs.writeFile("generatedFile/README.md", content, (err) => {
        if (err) throw err;
        else {
            console.log("File written successfully\n");
            console.log("The written file has the following contents:");
            console.log(fs.readFileSync("generatedFile/README.md", "utf8"));
        }
    });
}


function generateHeaderReference(headerText) { //A camelCase to kebab-case function
    return headerText.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function generateHeaderTitle(headerText) {  //A camelCase to Plain Text function (where every word's first char is captiliased)
    return headerText
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
 }

runInitalQuestions(); //runs the intial questionnare which then runs the rest of the program