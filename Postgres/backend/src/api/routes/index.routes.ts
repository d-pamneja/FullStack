import { Router } from "express";
import { userRouter } from "./user.routes";

export const appRouter = Router();

appRouter.get('/', (req, res) => {
    res.status(200).send("Hello from Postgres Todo!!");
});

appRouter.use('/user',userRouter)