import { Router } from "express";
import { userRouter } from "./user.routes";
import { ToDoRouter } from "./todo.routes";

export const appRouter = Router();

appRouter.use("/user",userRouter)
appRouter.use("/todo",ToDoRouter)

export default {appRouter}