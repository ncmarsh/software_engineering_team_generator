const inquirer = require("inquirer");

// Employee parent class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
        // return inquirer.prompt([
        //     {
        //         type: "input",
        //         message: "What is your employees name?",
        //         name: "name"
        //     }
        // ]).then(function(response) {
        //     return response.name;
        // })
    }

    getId() {
        return this.id;
        
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
}

module.exports = Employee;