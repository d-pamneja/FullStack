import { Router } from "express";
import {checkCredentials}  from "../middlewares/user";
import { signUp,login } from "../controllers/user";

export const userRouter = Router()

// The as any syntax is called a type assertion and effectively turns off type checking for the specific parameter. Basically, we are calling this assertion as we will not pass the parameters for middlewares mannually
userRouter.post('/signup',checkCredentials as any,signUp) 
userRouter.post('/login',checkCredentials as any,login)

export default userRouter