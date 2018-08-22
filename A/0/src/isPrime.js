function isPrime(num) {
    for (i = 2; i < num; i++)
        if (num % i === 0) {
            return false;
        }
    return true;
}
//console.log(isPrime(5)); => true;