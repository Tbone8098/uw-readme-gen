const fs = require("fs");
const inquirer = require("inquirer");

// Licenses
const licenseLib = {
    "Apache 2.0":
        "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    Boost:
        "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
    "BSD 3-Clause":
        "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
    "BSD 2-Clause":
        "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
    CCO:
        "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)",
    "Attribution 4.0 International":
        "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)",
    "Attribution-ShareAlike 4.0 International":
        "[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-sa/4.0/)",
    "Eclipse Public License 1.0":
        "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
    "GNU GPL v3":
        "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
    "GNU GPL v2":
        "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",
    "GNU AGPL v3":
        "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
    "GNU LGPL v3":
        "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)",
    "IBM Public License V 1.0":
        "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)",
    ISC:
        "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
    MIT:
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    Mozilla:
        "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
    "The Artistic Licenses 2.0":
        "[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)",
    "The Perl License":
        "[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)",
    WTFPL:
        "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)",
    "The Unlicense":
        "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
};

async function runTime() {
    let userInput = await prompUser();
    console.log(userInput);
    let file = populateFile(userInput);
    saveFile(file, userInput.projectTitle);
}

//  inquirer
// questions:

async function prompUser() {
    return inquirer.prompt([
        // what is the app for
        {
            type: "input",
            message: "Name of the application?",
            name: "projectTitle",
        },
        {
            type: "checkbox",
            message: "what License do you want for your application?",
            name: "appLicenses",
            choices: [
                "Apache 2.0",
                "Boost",
                "BSD 3-Clause",
                "BSD 2-Clause",
                "CCO",
                "Attribution 4.0 International",
                "Attribution-ShareAlike 4.0 International",
                "Eclipse Public License 1.0",
                "GNU GPL v3",
                "GNU GPL v2",
                "GNU AGPL v3",
                "GNU LGPL v3",
                "IBM Public License V 1.0",
                "ISC",
                "MIT",
                "Mozilla",
                "The Artistic Licenses 2.0",
                "The Perl License",
                "WTFPL",
                "The Unlicense",
            ],
        },
        {
            type: "input",
            message: "What is the purpose of the application?",
            name: "purpose",
        },
        // how to use the app
        {
            type: "input",
            message: "How do you use the application?",
            name: "useCase",
        },
        // how to install it
        {
            type: "input",
            message: "What are the procedures for installing the application?",
            name: "installIt",
        },
        // how to report issues
        {
            type: "input",
            message: "How will someone report an issue?",
            name: "reportIssue",
        },
        // how to make contributions
        {
            type: "input",
            message: "How can someone contribute to the project?",
            name: "contrib",
        },
        {
            type: "input",
            message: "What is your github username",
            name: "githubName",
        },
        {
            type: "input",
            message: "What is your email address",
            name: "email",
        },
    ]);
}

// file licenseLib
function populateFile(userInput) {
    const {
        projectTitle,
        appLicenses,
        purpose,
        installIt,
        useCase,
        reportIssue,
        contrib,
        githubName,
        email,
    } = userInput;

    usersLicense = "";
    appLicenses.forEach((license) => {
        usersLicense += `${licenseLib[license]} `;
    });
    console.log(usersLicense);

    const file = `
${usersLicense}
# ${projectTitle}

### Table of Contents

-   [Description](#Description)
-   [Installation Instructions](#Installation-Instructions)
-   [Usage Information](#Usage-Information)
-   [Report An Issue](#Report-An-Issue)
-   [Contribute](#Contribute)

***

## Description

${purpose}

***

## Installation Instructions

${installIt}

***

## Usage Information

${useCase}

***

## Report An Issue

${reportIssue}

***

## Contribute

${contrib}

***
## Questions
Here is my gitHub account: [GitHub](http://www.github.com/${githubName})

If you have any questions you can reach also reach me at my email: ${email}.

    `;
    return file;
}

// fs
function saveFile(file, projectName) {
    // const filename = `${projectName.replace(/[^a-z0-9_\-]/gi, "_")}.html`;

    // console.log(projectName);

    fs.writeFile(`${projectName}.md`, file, (err) =>
        err ? console.error(err) : console.log("Saved!")
    );
}

runTime();
