import express from 'express'
import {config} from "dotenv";
import appRouter from './routes';

// App Initialisation
config();
const app = express()


// Middlewares
app.use(express.json())
app.use('/',appRouter)

// Export the app
export default app