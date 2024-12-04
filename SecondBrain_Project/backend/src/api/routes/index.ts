import { Router } from "express";
import userRouter from "./user";
import contentRouter from "./content";
import shareRouter from "./share";
import thridPartyRouter from "./auth";
import storageRouter from "./storage";

const appRouter = Router()

appRouter.get('/', (req, res) => {
    res.status(200).send("Hello from 100xBrainly Backend!");
});
appRouter.use('/user',userRouter)
appRouter.use('/content',contentRouter)
appRouter.use('/share',shareRouter)
appRouter.use('/auth',thridPartyRouter)
appRouter.use('/store',storageRouter)

export default appRouter