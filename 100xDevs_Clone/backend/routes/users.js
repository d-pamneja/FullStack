import { Router } from "express";
import { logger,loginCheckCredentials,checkCredentials,auth } from "../middlewares/middlewares.js";
import { login,signUp,logout,buyCourse,viewCourse,viewAllCourses,viewMyCourses } from "../controllers/users.js";

const userRouter = Router()
userRouter.use(logger)

// Routes 
userRouter.post("/sign-up",checkCredentials,signUp)
userRouter.post("/login",loginCheckCredentials,login) 

userRouter.use(auth) // For all endpoints below this, the users needs to be authenticated
userRouter.get("/logout",logout) 
userRouter.post("/buy-course",buyCourse)
userRouter.get("/view-course",viewCourse)
userRouter.get("/view-my-courses",viewMyCourses)
userRouter.get("/view-all-courses",viewAllCourses)


// Exporting the user Router
export default userRouter;