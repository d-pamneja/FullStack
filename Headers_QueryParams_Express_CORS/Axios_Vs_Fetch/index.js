// Axios vs Fetch
// Axios is simpler syntactically and provide 5 additonal things as compared to fetch, which is why it is more commonly used and prefered.

// GET REQUESTS
// Fetch 
// function successCommand(){
//     console.log("Request fetched from link.")
// }

// function main(){
//     fetch("https://jsonplaceholder.typicode.com/posts").then(
//         async response =>{
//             const data = await response.json();
//             console.log(data)
//         }
//     ).finally(successCommand)
// }

// main()

// // Axios
// const axios = require("axios")

// async function main(){
//     const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1")
//     console.log(response.data)
// }

// main()


// GET REQUESTS
// // Fetch 
// function successCommand(){
//     console.log("Request fetched from link.")
// }

// function main(){
//     fetch("https://api.restful-api.dev/objects",{
//         method : "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body : JSON.stringify({
//             "name": "Apple MacBook Pro 16 M4",
//             "data": {
//                "year": 2025,
//                "price": 1849.99,
//                "CPU model": "Apple Silicon M4",
//                "Hard disk size": "1 TB"
//             }
//          })
//     }).then(
//         async response =>{
//             const data = await response.json();
//             console.log(data)
//         }
//     ).finally(successCommand)
// }

// main()

// // Axios
// const axios = require("axios")

// async function main(){
//     const response = await axios.post("https://api.restful-api.dev/objects",{
//                                         "name": "Apple MacBook Pro 18 M4",
//                                         "data": {
//                                         "year": 2026,
//                                         "price": 2100,
//                                         "CPU model": "Apple Silicon M4",
//                                         "Hard disk size": "2 TB"
//                                         }
//                     })
//     console.log(response.data)
// }

// main()

// Logging information about requests usign HTTPDumps
const axios = require("axios")

async function main(){
    const response = await axios.post("https://httpdump.app/dumps/d890e836-d02f-4051-8e70-b952d3ff9d63",{
                                        "name": "Apple MacBook Pro 18 M4",
                                        "data": {
                                        "year": 2026,
                                        "price": 2100,
                                        "CPU model": "Apple Silicon M4",
                                        "Hard disk size": "2 TB"
                                        }
                    })
    console.log(response.data)
}


main()