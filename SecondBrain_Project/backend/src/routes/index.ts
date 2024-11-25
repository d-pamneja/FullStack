import { Router } from "express";
import userRouter from "./user";
import contentRouter from "./content";
import shareRouter from "./share";
import googleRouter from "./auth";

const appRouter = Router()

appRouter.use('/user',userRouter)
appRouter.use('/content',contentRouter)
appRouter.use('/share',shareRouter)
appRouter.use('/auth',googleRouter)

export default appRouter