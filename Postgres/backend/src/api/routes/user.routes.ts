import { Router } from "express";
import { deleteUser, SignUpUser, viewUser } from "../controllers/user.controllers";

export const userRouter = Router();
userRouter.get('/view',viewUser)
userRouter.post('/signup',SignUpUser)
userRouter.delete('/delete',deleteUser)