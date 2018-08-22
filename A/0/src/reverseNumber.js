function reverseNumber(num) {
    num = num + "";
    return num.split("").reverse().join("");
}

//console.log(reverseNumber(123)); => 321
//console.log(reverseNumber(-456)); => -654
//console.log(reverseNumber(1000)); => 1