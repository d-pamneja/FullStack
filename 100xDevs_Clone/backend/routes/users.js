import { Router } from "express";
import { logger,loginCheckCredentials,checkCredentials,auth } from "../middlewares/middlewares.js";
import { login,signUp,logout,buyCourse,courseIsPurchased,viewCourse,viewAllCourses,viewMyCourses } from "../controllers/users.js";

const userRouter = Router()
userRouter.use(logger)

// Routes 
userRouter.post("/sign-up",checkCredentials,signUp)
userRouter.post("/login",loginCheckCredentials,login) 
userRouter.get("/view-all-courses",viewAllCourses)

userRouter.use(auth) // For all endpoints below this, the users needs to be authenticated
userRouter.get("/logout",logout) 
userRouter.post("/buy-course",buyCourse)
userRouter.get("/view-course",viewCourse)
userRouter.get("/valid-course",courseIsPurchased)
userRouter.get("/view-my-courses",viewMyCourses)


// Exporting the user Router
export default userRouter;