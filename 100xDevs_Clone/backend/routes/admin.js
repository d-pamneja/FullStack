import { Router } from "express";
import { logger,loginCheckCredentials,checkCredentials,adminAuth } from "../middlewares/middlewares.js";
import { adminSignUp,adminLogin,adminLogout,addCourse,updateCourse,deleteCourse,viewMetrics,viewAdminAllCourses } from "../controllers/admin.js";

const adminRouter = Router()
adminRouter.use(logger)

// Routes
adminRouter.post("/sign-up",checkCredentials,adminSignUp)
adminRouter.post("/login",loginCheckCredentials,adminLogin) 
adminRouter.get("/logout",adminAuth,adminLogout) 
adminRouter.post("/add-course",adminAuth,addCourse)
adminRouter.put("/update-course",adminAuth,updateCourse)
adminRouter.delete("delete-course",adminAuth,deleteCourse)
adminRouter.get("/view-metrics",adminAuth,viewMetrics)
adminRouter.get("/view-all-courses",adminAuth,viewAdminAllCourses)


// Exporting the user Router
export default adminRouter;