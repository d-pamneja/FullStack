import { Router } from "express";
import { auth } from "../middlewares/auth";
import { addContent } from "../controllers/content";

const contentRouter = Router()

contentRouter.post('/addContent',auth as any,addContent)

export default contentRouter