import { Router } from "express";
import { CreateUser, DeleteUser, UpdateUser } from "../controllers/users.controllers";

export const userRouter = Router()

userRouter.post("/createUser",CreateUser)
userRouter.put("/updateUser",UpdateUser)
userRouter.delete("/deleteUser",DeleteUser)

export default {userRouter}