// 1. Sum of two numbers

function sum(a, b) {
    // // Method 1 : Using typeof
    // if (typeof(a) != "number") {
    //     return "A is Invalid Input";
    // } else if (typeof(b) != "number") {
    //     return "B is Invalid Input";
    // } else {
    //     return a + b;
    // }

    // Method 2: Using ParseInt
    return parseInt(a) + parseInt(b);
}

let ans = sum(2, 3);
console.log(ans);

// 2. Sum from 1 to n

function sum2(n) {
    // // Method 1 : Using typeof
    // if (typeof(n) != "number") {
    //     return "n is Invalid Input";
    // } else {
    //     let ans = 0;
    //     for (let i = 1; i <= n; i++) {
    //         ans += i;
    //     }

    //     return ans;
    // }

    // // Method 2: Using ParseInt
    // let ans = 0;
    // for (let i = 1; i <= parseInt(n); i++) {
    //     ans += i;
    // }

    // Method 2: Using Formula
    return (parseInt(n) * parseInt(n + 1)) / 2;
}

let sol = sum2(5);
console.log(sol);

// Now, all this code is Syncronous. In simple terms, synchroneous code is the code that runs line by line.
// This means that all the code is executed in a sequence. If there is a function call, the function is executed and then the code continues.
// A single thread is used to execute the code. This means that only one task can be executed at a time, as all lines are executed in a sequence on the same thread.