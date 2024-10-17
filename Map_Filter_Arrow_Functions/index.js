// // Different ways of writing functions

// // Arrow functions (a way to define functions)
// function sum(a,b){
//     return a + b;
// }

// const sum = (a,b)=>{
//     return a+b;
// }

// app.get("/",(req,res)=>{
//     console.log()
// })

// app.post("/",function(req,res){
//     console.log()
// })


// Mapping
// Probelm Statement - Convert all elements of an array into it's 2nd multiple i.e. multiply all elements of an array by 2

const arr = [1,2,3,4,5]
let newArr = []

// // Method 1 : Simple Iteration
for(let i=0;i<arr.length;i++){
    newArr.push(arr[i]*2);
}

console.log(newArr);

// // Method 2 : Mapping
function multiplyBy2(input){
    return input * 2;
}

newArr = arr.map(multiplyBy2);
console.log(newArr)

// Filters
// Problem Statement - Given an input array, give all the odd values

const nums = [1,2,3,4,5]
let newNums = []

// // Method 1 : Simple Iteration
for(let i=0;i<nums.length;i++){
    if(nums[i]%2==0){
        newNums.push(nums[i]);
    }
}
console.log(newNums);

// Method 2 : Filtering
newNums = nums.filter((n)=>{
    return n%2==1;
})
console.log(newNums);





