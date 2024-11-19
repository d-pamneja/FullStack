import { Router } from "express";
import userRouter from "./user";
import contentRouter from "./content";
import shareRouter from "./share";

const appRouter = Router()

appRouter.use('/user',userRouter)
appRouter.use('/content',contentRouter)
appRouter.use('/share',shareRouter)

export default appRouter