import { pgClient } from "./config.db"

export async function createUserTable(Query : String) {
    try {
        const result = await pgClient.query(`${Query}`)
        console.log("Query to create user table successfully executed.",result)
    } catch (error) {
        console.log("Query to create user table failed",error)
    }
}

export async function createToDoTable(Query : String) {
    try {
        const result = await pgClient.query(`${Query}`)
        console.log("Query to create todo table successfully executed.",result)
    } catch (error) {
        console.log("Query to create todo table failed : ",error)
    }
}

export async function createTodo(
    userid: Int16Array,
    title : String,
    status : Boolean,
    description : String
){
    try {
        const insertQuery =  `INSERT INTO todo (userid,title,status,description) VALUES (${userid},${title},${status},${description});`
        const result = await pgClient.query(insertQuery);
        console.log("Query to create new user successfully executed.",result)
    } catch (error) {
        console.log("Could not insert the user in database : ", error)
    }
}

// export async function updateTodo(
//     id : Int16Array,
//     userid: Int16Array,
//     title? : String,
//     status? : Boolean,
//     description? : String
// ){
//     try {
//         const insertQuery =  `UPDATE todo SET (title,status,description) VALUES (${title},${status},${description}) WHERE userid=${userid} AND id=${id};`
//         const result = await pgClient.query(insertQuery);
//         console.log("Query to create new user successfully executed.",result)
//     } catch (error) {
//         console.log("Could not insert the user in database : ", error)
//     }
// }
