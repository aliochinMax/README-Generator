# README-Generator

Author: aliochinMax

# ![License Badge](https://shields.io/badge/license-MIT-green)

## Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [How To Contribute](#how-to-contribute)
- [Further Development](#further-development)

## Description

A readme markdown generator, includes a working table of contents that is generated based of sections the user selects. Sections that can be made using this node.js app include: A description; How to Use; How to Contribute; Further Development; Screenshots of Use; Screenshots of Development; Development diary. Currently only, text based sections can be added through the app, sections that require images/videos are not supported and content has to be added manually after the markdown file is created. Technologies used: JavaScript, node.js, inquirer.

## How To Use

Open the README-generator directory and use the command `node index.js` to run the app. The generated readme is stored in the generatedFile dir. To add more questions go into questions.json file and add an object within the array, if your question(s) are answered through text add a prompt property using inquirer syntax and a checkString property, if your question(s) are not answered by text then just add a checkString and name property. Then add the checkString value in choices, in 'What contents do you wish to include' within the inquirer prompt in initial questions.

## How To Contribute

Fork the project, make changes, sumbit a pull request.

## Further Development

Firstly, questions.json should be refactored and subsequently the contentQuestionnare function. In it's current state it's awkard to useand requries too much manipulation to complete simple actions such as checking if a section was selected. This issue occured due to lack of planning. Secondly, allow for images to be added through the app not manually after generation.
