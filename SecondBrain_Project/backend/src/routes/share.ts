import { Router } from "express";
import { auth } from "../middlewares/auth";
import { shareLink, viewLink } from "../controllers/sharing";

export const shareRouter = Router()

shareRouter.post('/shareBrain',auth as any,shareLink)
shareRouter.get('/viewBrain/:uid',auth as any,viewLink)

export default shareRouter

