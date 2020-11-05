// Engineer class that extends from Employee parent class
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        // Call in super of Employee parent class
        super(name, id, email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;