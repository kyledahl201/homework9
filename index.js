const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");
const moment = require("moment");


//this is for promisify

const writeFileAsync = util.promisify(fs.writeFile);

init();

async function init() {
        try {
                //start user

                const userRespnse = await promptUser();

                // Resuluts from user

                const {
                    fullName, username, title, shortDescription, longDescription, screenshotUrl, installation, usage, credits, license, tests, badge, contributor 
                } 
                = userRespnse;


                // lists fom responses



        const installationList = await createList(installation, "ordered");
        const usageList = await createList(usage, "unordered");
        const creditList = await createList(credits, "unordered");
        const testList = await createList(tests, "unordered");

        //badges from badge url

        const badgeTags = await renderContributing(contributor);]

        //this is for the axios call
        
        const queryUrl = `https://api.github.com/search/users?q=${username}`;

        const response = await axios.get(queryUrl);
        const { avatar_url } = response.data.items[0];
        console.log(avatar_url);


        //get the year

        const year = await moment().year();

        //create the template

        const template = await generateTemplate(fullName, username, title, shortDescription, longDescription, screenshotUrl, installationList, usageList, creditList, license, testList, badgeTags, contributingCopy, avatarUrl, year);


        //write the file

        await writeFileAsync("generate-readme.md", template, "utf8");





console.log("read me has been made");


        } 
        catch (err) {

            console.log(err);
        }







}


//function that asks users for data

function promptUser() {

    return inquirer.prompt([


        {
            type: "input",
            message: "Enter your full name:",
            name: "fullName"
        },
        {
            type: "input",
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            type: "input",
            message: "Give your project a title:",
            name: "title"
        },
        {
            type: "input",
            message: "Give your project a short description:",
            name: "shortDescription"
        },
        {
            type: "input",
            message: "Give your project a long description:",
            name: "longDescription"
        },
        {
            type: "input",
            message: "Include a url of a screenshot:",
            name: "screenshotUrl"
        },
        {
            type: "input",
            message: "Provide a step-by-step description of how to install your project (separate using commas):",
            name: "installation"
        },
        {
            type: "input",
            message: "Provide instructions and examples for use (separate using commas):",
            name: "usage"
        },
        {
            type: "input",
            message: "List your collaborators, third-party assets, etc. if any (separate using commas):",
            name: "credits"
        },
        {
            type: "list",
            message: "Choose a license for your project:",
            name: "license",
            choices: [
                "MIT License",
                "GNU AGPLv3",
                "GNU GPLv3",
                "GNU LGPLv3",
                "GNU GPLv2",
                "Mozilla Public License 2.0",
                "Apache License 2.0",
                "ISC License",
                "Boost Software License 1.0",
                "The Unlicense"
            ]
        },
        {
            type: "input",
            message: "Write tests for your application (separate using commas):",
            name: "tests"
        },
        {
            type: "input",
            message: "Add urls (separate using commas) for badges:",
            name: "badge"
        },
        {
            type: "confirm",
            message: "Would you like to allow contributors?",
            name: "contributor",
            default: true
        }






    ])














}

// Create function to render contributing section 

function renderContributing(contributor) {

        if (contributor) {
            return "Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms. [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)"
        } else {
            return "Nothing."
        }





}

//create function to render badges for layout 

function renderBadges(badge) {

    const badgeArray = badge.split(",");
    let badgeTemplate = "";
    for (let i = 0; i < badgeArray.length; i++) {

        badgeTemplate += "![Badge](" + badgeArray[i] + ") ";

    }
    return badgeTemplate;
    



}
