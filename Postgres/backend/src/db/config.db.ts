import { Client } from "pg";
import { createUserTable,createToDoTable } from "./controllers.db";
import { USER_TABLE_QUERY,TODO_TABLE_QUERY } from "./queries.db";
import dotenv from 'dotenv'
dotenv.config()

export const pgClient = new Client(process.env.POSTGRES_CONNECTION);

async function connect(pgClient : Client) {
    try {
        await pgClient.connect();
    } catch (error) {
        console.log("Could not connect to postgres Server : ",error)
    }
}

export async function dbConfig(){
    try {
        connect(pgClient);
        createUserTable(USER_TABLE_QUERY);
        createToDoTable(TODO_TABLE_QUERY);
    } catch (error) {
        console.log("Could not configure and connect to DB : ",error)
    }
}
