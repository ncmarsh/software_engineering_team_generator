const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const cssPath = path.join(OUTPUT_DIR, "style.css");

const render = require("./lib/htmlRenderer");
const { run } = require("jest");

// Array of employees to add to
const employees = [];

// Validation functions for user input
// Generic validation to make sure the input isn't blank
const checkIfEmpty = function(name) {
    if (name === "") {
        return "Oh no, this field is blank. Please enter valid information.";
    } else {
        return true;
    }
}

// Check to see if input is blank and if id already exists
const checkIds = function(id) {
    if (id === "") {
        return "Oh no, this field is blank. Please enter a valid id.";
    }

    for (let i = 0; i < employees.length; i++) {
        let idExists = employees[i].id;
        if (id === idExists) {
            return "This id belongs to another employee. Please enter a valid id.";
        } else {
            return true;
        }
    }
}

// Check to see if input is blank and if email is in the correct format
const checkEmail = function(email) {
    if (email === "") {
        return "Oh no, this field is blank. Please enter a valid email address.";
    } else if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        return true;
    } else {
        return "Please enter a valid email address.";
    }
}

// Inquirer questions
// Initial questions to prompt the user
const startQ = [
    {
        prefix: "Let's build your team:",
        type: "input",
        message: "\nWhat is your manager's name?",
        name: "name",
        validate: checkIfEmpty,
    },
    {
        type: "input",
        message: "What is your manager's id?",
        name: "id",
        validate: checkIfEmpty,
    },
    {
        type: "input",
        message: "What is your manager's email?",
        name: "email",
        validate: checkEmail,
    },
    {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber",
        validate: checkIfEmpty,
    }
]

// Transition question
const question = [
    {
        type: "list",
        message: "Which type of team member would you like to add next?",
        name: "role",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members."
        ],
    }
]

// Array of engineer questions
const engineerQ = [
    {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
        validate: checkIfEmpty,
    },
    {
        type: "input",
        message: "What is your engineer's id?",
        name: "id",
        validate: checkIds,
    },
    {
        type: "input",
        message: "What is your engineer's email?",
        name: "email",
        validate: checkEmail,
    },
    {
        type: "input",
        message: "What is your engineer's GitHub username?",
        name: "github",
        validate: checkIfEmpty,
    }
]

// Array of intern questions
const internQ = [
    {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
        validate: checkIfEmpty,
    },
    {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
        validate: checkIds,
    },
    {
        type: "input",
        message: "What is your intern's email?",
        name: "email",
        validate: checkEmail,
    },
    {
        type: "input",
        message: "What is your intern's school?",
        name: "school",
        validate: checkIfEmpty,
    }
]

// Function to run Engineer questions
function runEngineer() {
    inquirer
        .prompt(
            engineerQ
        )
        .then(function(response) {
            let newEngineer = new Engineer(response.name, response.id, response.email, response.github);
            employees.push(newEngineer);
            nextRole();
    })
}

// Function to run Intern questions
function runIntern() {
    inquirer
        .prompt(
            internQ
        )
        .then(function(response) {
            let newIntern = new Intern(response.name, response.id, response.email, response.school);
            employees.push(newIntern);
            nextRole();
    })
}

// Function to prompt multiple choice question about which employee to add next or to finish list
function nextRole() {
    inquirer
        .prompt(
            question
        )
        .then(function(response) {
            if (response.role === "Engineer") {
                runEngineer();
            }
            else if (response.role === "Intern") {
                runIntern();
            }
            else {
                console.log("That's all folks");
                console.log(employees);
                createHTMLFile(employees);
            }
    })
}

// Function to create the user's generated folder and files
function createUserFile(data) {
    fs.writeFile(outputPath, render(data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    })

    fs.copyFile("./templates/style.css", cssPath, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    })
}

// Function to generate the HTML file from the templates
function createHTMLFile(data) {
    if (fs.existsSync(OUTPUT_DIR)) {
        createUserFile(data);
    } else {
        fs.mkdir(OUTPUT_DIR, function(err) {
            if (err) {
                return console.log(err);
            }
        })
    
        createUserFile(data);
    }
}

// Function to begin inquirer prompts when user activates application
inquirer
    .prompt(
        startQ
    )
    .then(function(response) {
        let newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(newManager);
        nextRole();
    })
