import { Router } from "express";
import { logger,loginCheckCredentials,checkCredentials,auth } from "../middlewares/middlewares.js";
import { login,signUp,logout,buyCourse,viewCourse,viewAllCourses,viewMyCourses } from "../controllers/users.js";

const userRouter = Router()
userRouter.use(logger)

// Routes
userRouter.post("/sign-up",checkCredentials,signUp)
userRouter.post("/login",loginCheckCredentials,login) 
userRouter.get("/logout",auth,logout) 
userRouter.post("/buy-course",auth,buyCourse)
userRouter.get("/view-course",auth,viewCourse)
userRouter.get("/view-my-courses",auth,viewMyCourses)
userRouter.get("/view-all-courses",auth,viewAllCourses)


// Exporting the user Router
export default userRouter;