import { Router } from "express";
import { SignUpUser } from "../controllers/user.controllers";

export const userRouter = Router();
userRouter.post('/signup',SignUpUser)