import { Router } from "express";
import userRouter from "./users.js";
import adminRouter from "./admin.js";


const appRouter = Router()

appRouter.use("/user",userRouter) 
appRouter.use("/admin",adminRouter) 

export default appRouter;