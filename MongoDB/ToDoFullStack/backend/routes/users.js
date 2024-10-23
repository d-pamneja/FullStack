import { Router } from "express";
import { logger,loginCheckCredentials,checkCredentials,auth } from "../middlewares/middlewares.js";
import { login,signUp,logout } from "../controllers/user.js";

const userRouter = Router()
userRouter.use(logger)

// Routes
userRouter.post("/sign-up",checkCredentials,signUp) // If request to '/user/sign-up' is made via frontend, it will be handled by signUp after middleware checks
userRouter.post("/login",loginCheckCredentials,login) // If request to '/user/login' is made via frontend, it will be handled by login after middleware checks
userRouter.get("/logout",auth,logout) // If request to '/user/logout' is made via frontend, it will be handled by logout after middleware checks

// Exporting the user Router
export default userRouter;