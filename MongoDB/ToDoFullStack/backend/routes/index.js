import { Router } from "express";
import userRouter from "./users.js";
import todoRouter from "./todos.js";


const appRouter = Router()

appRouter.use("/user",userRouter) // If request to '/user' is made via frontend, it will be handled by userRouter
appRouter.use("/todo",todoRouter) // If request to '/todo' is made via frontend, it will be handled by todoRouter

export default appRouter;