// Intern class that extends from Employee parent class
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        // Call in super of Employee parent class
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;