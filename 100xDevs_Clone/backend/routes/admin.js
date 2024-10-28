import { Router } from "express";
import { logger,loginCheckCredentials,checkCredentials,adminAuth } from "../middlewares/middlewares.js";
import { adminSignUp,adminLogin,adminLogout,addCourse,updateCourse,deleteCourse,viewMetrics,viewAdminAllCourses } from "../controllers/admin.js";

const adminRouter = Router()
adminRouter.use(logger)

// Routes
adminRouter.post("/sign-up",checkCredentials,adminSignUp)
adminRouter.post("/login",loginCheckCredentials,adminLogin) 

adminRouter.use(adminAuth) // For all endpoints below this, the admins needs to be authenticated
adminRouter.get("/logout",adminLogout) 
adminRouter.post("/add-course",addCourse)
adminRouter.put("/update-course",updateCourse)
adminRouter.delete("/delete-course",deleteCourse)
adminRouter.get("/view-metrics",viewMetrics)
adminRouter.get("/view-all-courses",viewAdminAllCourses)


// Exporting the user Router
export default adminRouter;