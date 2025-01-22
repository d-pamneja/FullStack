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

export async function createAddressTable(Query : String) {
    try {
        const result = await pgClient.query(`${Query}`)
        console.log("Query to create addresses table successfully executed.",result)
    } catch (error) {
        console.log("Query to create addresses table failed : ",error)
    }
}
