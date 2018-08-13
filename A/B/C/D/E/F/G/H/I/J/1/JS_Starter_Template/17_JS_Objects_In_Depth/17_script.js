// Simple Objects creation and access in JS
var Obj = {};
Obj.firstName = "Naveen";
Obj.lastName = "Saggam";

console.log(Obj);
console.log(Obj.firstName);

// Creation of Employees Objects with raw data
var employee1 = {};
employee1.firstName = "John";
employee1.lastName = "Kennedy";
employee1.gender = "M";
employee1.designation = "Regional Manager";

console.log(employee1);

var employee2 = {};
employee1.firstName = "John";
employee1.lastName = "Cena";
employee1.gender = "M";
employee1.designation = "Delivery Manager";

console.log(employee2);

// Creation of a function to produce Employee Object
function createEmployee(firstName,lastName,gender,designation) {
    var employeeObj = {};
    employeeObj.firstName = firstName;
    employeeObj.lastName = lastName;
    employeeObj.gender = gender;
    employeeObj.designation = designation;
    return employeeObj;
}

var employee3 = createEmployee("Ram","Rajan",38,"Sales Representative")
console.log(employee3);

// JS Constructors Example
function CreateEmployeeConstructor(firstName,lastName,gender,designation) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.designation = designation;
    return this;
}
var employee4 = new CreateEmployeeConstructor("Ram","Rajan",38,"Sales Representative");
console.log(employee4);
