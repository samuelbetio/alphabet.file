function getClosestToZero(...arr) {
    return arr.sort(function (a, b) {
        return Math.abs(a) > Math.abs(b) ? 1 : -1;
    })[0];
}
//console.log(getClosestToZero(9, 5, -4, -9)); // => -4