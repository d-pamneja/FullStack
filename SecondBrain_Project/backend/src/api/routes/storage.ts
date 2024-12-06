import { Router } from "express";
import {auth} from "../middlewares/auth";
import { getObject, removeObject, setObject, setObjectPinecone } from "../controllers/storage";

export const storageRouter = Router()

storageRouter.use(auth as any)
storageRouter.get('/getObject',getObject)
storageRouter.post('/setObject',setObject)
storageRouter.post('/setObjectPinecone',setObjectPinecone)
storageRouter.delete('/removeObject',removeObject)

export default storageRouter