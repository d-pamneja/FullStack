import { Router } from "express";
import userRouter from "./user";
import contentRouter from "./content";

const appRouter = Router()

appRouter.use('/user',userRouter)
appRouter.use('/content',contentRouter)

export default appRouter