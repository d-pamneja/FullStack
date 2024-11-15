// let x = 1  // Here, type inferencing is happening i.e. the system automatically assumed x will be a number
// let y : number = 2 // Here, we can explicitly tell the type of a variable in typescript
// console.log(x+y)

// 1. Type defining a parameter in a function
const userName = (firstName : string) =>{
    console.log(`Hello ${firstName}`)
}

userName("DP")


const sum = (a : number ,b : number) : number => { // Both arguments are number and it will also return a number
    return a+b
}
const ans = sum(1,2)
console.log(ans)

// 2. Function 
function delayedCall(time : number, fn : () => void){ 
    // Here, it says that the function "Delayed Call" expects a number and a function that further has a no arguments 
    // and will return "void" or nothing

    setTimeout(fn,time)
}

const time = 1000
delayedCall(time,()=>{
    console.log(`Delayed function called after ${time/1000} seconds`)
})

// 3. Object Definition
function greet(user : {
    name : string,
    age : number
}){
    console.log(`Hello ${user.name}, you are ${user.age} yeards old`)
}

function greet2(userInfo : {
    course : string,
    cgpa : number 
}){
    const gpa = ((userInfo.cgpa*10)/9.5)/(2.5)
    console.log(`You are currenly enrolled in ${userInfo.course} with a GPA of ${gpa.toFixed(2)}/4.00`)
}



// delayedCall(3000,()=>{
//     greet({
//         name:"dhruv",
//         age:23
//     })
//     greet2({
//         course : "BSc DS AI",
//         cgpa : 8.03
//     })
// })

// Now, one issue is the above code has repetitions, so to solve it, we can use Interfaces.

interface user {
    name : string,
    course : string,
    cgpa : number
}

function greet3(user : user){ // This says the function will take a object which is of custom defined type, userType
    const gpa = ((user.cgpa*10)/9.5)/(2.5)
    console.log(`Hello ${user.name}.`)
    console.log(`You are currenly enrolled in ${user.course} with a current GPA of ${gpa.toFixed(2)}/4.00`)
}

delayedCall(2000,()=>{
    greet3({
        name : "Dhruv",
        course : "BSc DS AI",
        cgpa : 8.1
    })
})

// Also, one can also create type (very similar to interface, but allow for some added operations)

// OR operation (Unions)
type userCGPAType = string | number;

function greet4(cgpa : userCGPAType){
    if(typeof(cgpa)=="number"){
        const gpa = ((cgpa*10)/9.5)
        console.log(`Current CGPA (Normalised) of ${gpa.toFixed(2)}/10.00`)
    }
    else{
        const numericCGPA = parseFloat(cgpa)
        const gpa = ((numericCGPA*10)/9.5)
        console.log(`Current CGPA (Normalised) of ${gpa.toFixed(2)}/10.00`)
    }
}

delayedCall(5000,()=>{
    greet4(8.1);
})

// AND operation (Intersection)

interface Employee {
    name : string,
    salary : number
}

interface Manager {
    name : string,
    salary : number,
    HOD : string
}

type TeamLead = Employee & Manager;

function corporateGreet(lead : TeamLead){
    console.log(`Welcome ${lead.name}, you are currenly at a salary of ${lead.salary} P.A. and head the ${lead.HOD} department`)
}

delayedCall(7000,()=>{
    corporateGreet({
        name : "XYZ",
        salary  : 5000000,
        HOD : "DevRel"
    })
})




