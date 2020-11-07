const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { run } = require("jest");

// Array of employees to add to
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Initial questions to prompt the user
const startQ = [
    // different question path for the different people
    // error if id number is already taken
    {
        prefix: "Let's build your team:",
        type: "input",
        message: "\nWhat is your manager's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your manager's id?",
        name: "id",
        // validate: function validateId(id) {
        //     return id !== "";
        // }
    },
    {
        type: "input",
        message: "What is your manager's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber"
    }
]

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
        // when: function(end) {
        //     return end.choices === "I don't want to add any more team members.";
        // }
    }
]

const engineerQ = [
    {
        type: "input",
        message: "What is your engineer's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your engineer's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your engineer's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your engineer's GitHub username?",
        name: "github"
    }
]

const internQ = [
    {
        type: "input",
        message: "What is your intern's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your intern's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your intern's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your intern's school?",
        name: "school"
    }
]

// Function to run Engineer questions
function runEngineer() {
    inquirer
        .prompt(
            engineerQ
        )
        .then(function(response) {
            response.role = "Engineer";
            employees.push(response);
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
            response.role = "Intern";
            employees.push(response);
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
            }
    })
}

// Function to begin inquirer prompts when user activates application
inquirer
    .prompt(
        startQ
    )
    .then(function(response) {
        console.log(response);
            response.role = "Manager";
            employees.push(response);
            nextRole();
    })

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// Call the render function with the array of employees
