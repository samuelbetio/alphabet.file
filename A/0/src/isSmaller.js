function isBigger(a, b) {
    return a > b;
};

function isSmaller(a, b) {
    return !isBigger(a, b);
};

//console.log(isBigger(5, -1)); => true;
//console.log(isSmaller(5, -1)); => false;