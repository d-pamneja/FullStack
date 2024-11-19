import { Router } from "express";
import { auth } from "../middlewares/auth";
import { addContent, deleteContent, viewContent } from "../controllers/content";

const contentRouter = Router()

contentRouter.post('/addContent',auth as any,addContent)
contentRouter.get('/viewContent',auth as any,viewContent)
contentRouter.delete('/deleteContent',auth as any,deleteContent)

export default contentRouter