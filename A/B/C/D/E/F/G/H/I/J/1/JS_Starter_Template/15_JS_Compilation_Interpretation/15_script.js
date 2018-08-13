//Compilation step 1 , no of variables created ?

var a = 10;
var b = 10;
console.log(a + b);

// Compilation step 2

var a = 10;
function  myFn() {
    var b = 20;
    var c = 30;
    console.log(a + b + c);
}
myFn();


// Compilation Step 3

var myName = "Naveen";
function greet(name) {
    console.log("Hello " + name);
}
greet(myName);


//Interpretation Step

var myName = "Naveen";
function greet(name) {
    console.log("Hello " + name);
}
greet(myName);

// Global Scope Problem

var a = 10;
function myFn() {
    var b = a;
    console.log(b);
    c = 100;
}

myFn();

// Coding Exercises for Compilation & Interpretation
var  a = 10;
function outer(){
    var b = a;
    console.log(b);
    function inner() {
        var b = 20;
        var c = b;
        console.log(c);
    }
    inner();
}
outer();

// Coding Exercises for Compilation & Interpretation
var  a = 10;
function outer(){
    var b = a;
    console.log(b);
    function inner() {
        var c = b;
        console.log(c);
        var b = 20;
    }
    inner();
}
outer();

//simple code
console.log(a); // undefined
var a = 10;

// Hoisting in JavaScript for variables
a = 10;
console.log(b);
c++;

var a;
var b;
var c;

// Hoisting in JS for Functions
myFn();

function myFn() {
    console.log("myFn");
}

//Hoisting for JS Recursive functions
function recusion() {
    // some serious code
    recusion();
}

// Hoisting for Function Expressions (not possible)
myFnA();

var myFnA = function () {
    console.log("Function Expression");
};

//using Strict Mode ("use strict";)

var myName1 = "";
myname1 = "Naveen";
console.log(myName1);
