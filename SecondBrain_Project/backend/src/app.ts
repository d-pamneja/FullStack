import express from 'express'
import {config} from "dotenv";
import appRouter from './routes';
import cookieParser from "cookie-parser";
import morgan from "morgan"
import cors from "cors";

// App Initialisation
config();
const app = express()


// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json())
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/',appRouter)

// Export the app
export default app