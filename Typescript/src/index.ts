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

// Interface - Other Features

interface Address {
    street : string,
    houseNo : string,
    pincode : number
}

interface User {
    name : string,
    age? : number // This means that age parameter is optional, and if it does exist, it HAS TO BE A NUMBER, 
    address? : Address // An interface can also use other interfaces, with which we can create complex interfaces (note how the address here is optional)
    greet : () => string; // This is a function which expects no arguments and returns a string type object
}

// Now, interfaces can also be used as classes, for example : 

const user1:User = { // Here, we have made an instance of User interface (or class in use case) called user1
    name : "Dhruv",
    age : 23,
    greet : ()=>{
        return `Hi ${user1.name}`
    }
}

console.log(user1.greet()) // We can call functions of this instance which are made available to the interface by default

// We can also create other classes which IMPLEMENT this interface
class Admin implements User {
    name : string
    greet : ()=> string
    no : number

    constructor(name:string,no:number){ // Define all the primitives it is SUPPOSE to have and initialise them. Note that in this case, whatever is 
        // compulsory in user class(inherited class/interface) that DEFINETELY has to be there, and one can also add other variables to admin class. 
        this.name = name,
        this.greet = ()=>{
            return `Hi Admin, ${name}`
        }
        this.no = no
    }
}

let ad1 = new Admin("DP",23)
console.log(ad1.greet())

// Also, we can extend classes
class Shape {
    area(){
        console.log("Function to calculate area.")
    }
}

class Rectangle extends Shape{
    width : number
    height : number 

    constructor(width:number,height:number){
        super() // This means extend and call the constructor and all functions of the extended class (i.e. Shape)
        this.width = width,
        this.height = height
    }
}

const rect1 = new Rectangle(1,2);
rect1.area()

// Abstract classes
// Now, a key difference between Abstract classes and interfaces is that we can have default methods (eg: functions) defiend in it which can extend to other classes, but cannot do the same in interface
abstract class Shape2 {
    area():void{ // An area function which returns void 
        console.log("Function to calculate area.")
    }
}

class Sqaure extends Shape{
    side : number

    constructor(side:number){
        super() // This means extend and call the constructor and all functions of the extended class (i.e. Shape2)
        this.side = side
    }
}

const sq1 = new Sqaure(4)
sq1.area()

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

type GoodUser ={
    name : string,
    gift : string
}

type BadUser = {
    name : string,
    ip : string
}

type testUser = GoodUser | BadUser; // Now, the testUser can be a goodUser or a BadUser (or could even be having both value from both types [UNION])

const t1 : testUser = {
    name : "MK1",
    gift  : "Prize1",
    ip : "123.123.123"
}

// AND operation (Intersection)

interface Employee {
    name : string,
    salary : number
    startDate : string
}

interface Manager {
    name : string,
    salary : number,
    HOD : string
}

type TeamLead = Employee & Manager; // Now, team lead will have properties of both of them (repeated properties only come once)

function corporateGreet(lead : TeamLead){
    console.log(`Welcome ${lead.name}, you joined on ${lead.startDate} are currenly at a salary of ${lead.salary} P.A. and head the ${lead.HOD} department`)
}

delayedCall(7000,()=>{
    corporateGreet({
        name : "XYZ",
        salary  : 5000000,
        startDate : "1/1/25",
        HOD : "DevRel"
    })
})

// Primary difference between Intersection and Unions is that in the first, YOU NEED TO HAVE ALL PROPERTIES in both of them, while in the 
// later, you can have either of them or may even have all of them.


// Assignment 1 : Two types user and Admin, and a function which takes either of them and returns a greeting with their name 

type UserA1 = {
    name : string,
    age : number
}

type AdminA1 = {
    name : string,
    auth : boolean
}

function greet5(t2 : UserA1 | AdminA1){
    console.log(`Hi there ${t2.name}`)
}

delayedCall(10000,()=>{
    greet5({
        name : "DP5",
        auth : true
    })
})


// Arrays
function getMax(nums : number[]){ // input type is array of numbers
    let max = 0;
    for(let i=0;i<nums.length;i++){
        if(nums[i]>max){
            max = nums[i]
        }
    }

    return max
}

delayedCall(12500, ()=>{
    let nums1 = [1,2,3,4,5,3,5,19,1,2,9,1,4,3]
    const ans = getMax(nums1)
    console.log(`Maximum number in array is ${ans}`)
})


// Assignment 2 : Return legal users from a list of users

type UserA2 = {
    name : string,
    age : number
}

function legalUsers(userArr : UserA2[]){
    // Easy Syntax
    // let ans = []
    // for(let i=0;i<userArr.length;i++){
    //     if(userArr[i].age>18){
    //         ans.push(userArr[i])
    //     }
    // }

    // return ans;

    // Filter Function
    return userArr.filter((user)=> user.age > 18)
}

const USERS = [
    {
        name : "DP1",
        age : 19
    },
    {
        name : "DP2",
        age : 10
    },
    {
        name : "DP3",
        age : 25
    },
    {
        name : "DP4",
        age : 22
    },
    {
        name : "DP5",
        age : 9
    },
    {
        name : "DP6",
        age : 19
    },
    {
        name : "DP7",
        age : 11
    },

]

delayedCall(15000,()=>{
    console.log(legalUsers(USERS))
})

// Pick API (a way to create subsets from types)
// We can pick certain  elements from a type directly instead of defining a new subset

type UserA3 = {
    id : string,
    name : string, 
    age : number, 
    email : string, 
    password : string
}

type updatedProps = Pick<UserA3,'name' | 'age' | 'password'>

function updateUserAllArgs(up : updatedProps){ // this means we are using the user type only, just choosing a certain subset
    return "User updated"
}

// Partial API (creates a new type which makes all properties of a given property optional)
// Can use to convert all compulory ones to partial (see above example above, one may want to just update one of the parameters in 
// updatedProps instead of all of them)

type updatedPropsOptional = Partial<updatedProps>

function updateUserOptionalArgs(up:updatedPropsOptional){
    return "User updated"
}

// Read Only API (makes parameters in a type only assignable once i.e. cannot edit)
// We can use this to lock certain params at the time of initialisation. Eg : in UserA3, we can use this 
// to lock changes to id and email so that they cannot be modified after they are created


type UserA4 = {
    readonly id : string,
    name? : string, 
    age? : number, 
    readonly email : string, 
    password? : string
}

const userA4Trail : UserA4 = {
    id : "123",
    name : "Dp",
    email : "dpamneja@gmail.com"
}

// Now, we cannot change id and email as they are initialised
// To make the entire object readonly, we can do 

const userA4Trail2 : Readonly<UserA4> = { // here, all variables have become readonly
    id : "123",
    name : "Dp",
    email : "dpamneja@gmail.com"
}


// Key Indexing

type UsersKeys = {
    [key: string] : string
}

const users2 : UsersKeys =  {
    "dp@25" : "abc",
    "dp@26" : "xyc",
    "dp@27" : "mno",
}

// Records 
// We can use records do to the above, as shown below

type UserRecords = Record<string,string> // UserRecords object will now be a type which has a string key and value also string

// Maps
// We can use the maps concept to direcly set or update values with direct instance recall

const users3 = new Map<string,{name : string , age : number}>() // A map object which will take a string key and value which has specified data type

// Set (Initialise values) 
users3.set("dp@25",{name : "Dhruv", age : 25})
users3.set("dp@26",{name : "Dhruv", age : 26})
users3.set("dp@27",{name : "Dhruv", age : 27})

// Get (Fetch values)
const user4 = users3.get("dp@25")

// Exclude 
// Now, this lets you exclude certain types from an defined function, which can be seen below 

type eventType = 'click' | 'scroll' | 'mousemove'
type excludeEvent = Exclude<eventType,'scroll'> // Now, this excludeEvent type will exclude only scroll from the above and can accept the other two

const handleEvent = (eve : excludeEvent) => {
    console.log(`Event Type is : ${eve}`)
}

handleEvent('click')

// Pick
// This lets you pick certain types from other pre defined interfaces

interface User2{
    id : number,
    name : string,
    age : number,
    email : string,
}

type user2Profile = Pick<User2,'name' | 'email'> // Now, will only pick these two from the predefined interface

const displayUser2Profile = (user : user2Profile)=>{
    console.log(`Welcome, ${user.name}, your email ID is : ${user.email}`)
} 

// TYPE INFERENCING ZOD
import {z} from 'zod'
import express from 'express'

const app = express()
// Define a new profile schema

const UserProfile = z.object({
    name : z.string().min(1,{message : "The user name cannot be blank"}),
    email : z.string().email({message : "Kindly enter a valid email"}),
    age : z.number().min(18,{message : "The user cannot be a minor"}).optional()
})

type UserProfileType = z.infer<typeof UserProfile> // With this, a new type will be created from the above parameters as defined

app.put('/user',(req,res)=>{ // This function will only update when it follows all criteria sucessfully
    const body : UserProfileType = req.body
    const {success} = UserProfile.safeParse(body)

    if(!success){
        res.status(411).json({message : "Invalid updates"})
    }
    else{
        res.status(200).json({messgae : "User updated"})
    }
})







