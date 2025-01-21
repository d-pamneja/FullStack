import { dbConfig } from "./db/config.db";
import express from 'express'
import { appRouter } from "./api/routes/index.routes";

dbConfig();


const app = express()
app.use(express.json())
app.use('/',appRouter)


app.listen(3001,()=>{
    console.log("App set and connected to Posgress DB.")
})

export default app;