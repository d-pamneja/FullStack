import express from 'express';
import cors from 'cors';

import appRouter from "./routes/index.js";
import {config} from "dotenv";

// App Initialisation
config();
const app = express()

// Middlewares
app.use(express.json())
app.use(cors({
    domains : ["http://127.0.0.1:5500/"]
}))
app.use('/',appRouter)

// Export the app
export default app;
