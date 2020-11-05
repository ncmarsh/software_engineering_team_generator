// Manager class that extends from Employee parent class
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // Call in super of Employee parent class
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;