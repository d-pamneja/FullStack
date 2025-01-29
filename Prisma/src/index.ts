import { appRouter } from "./routes/index.routes";
import express from 'express'

const app = express()

app.use(express.json())
app.use("/",appRouter)

const port = 3001
app.listen(port,()=>{
    console.log(`App live at port ${port}`)
})