import { Router } from "express";
import { logger,auth } from "../middlewares/middlewares.js";
import { addToDo,getToDos,updateToDo,deleteToDo } from "../controllers/toDos.js";

const todoRouter = Router()
todoRouter.use(logger)

// Routes
todoRouter.get("/getToDos",auth,getToDos) // If request to '/todo/getToDos' is made via frontend, it will be handled by getToDos after middleware checks
todoRouter.post("/addToDo",auth,addToDo) // If request to '/todo/addToDo' is made via frontend, it will be handled by addToDo after middleware checks
todoRouter.put("/updateToDo",auth,updateToDo) // If request to '/todo/updateToDo' is made via frontend, it will be handled by updateToDo after middleware checks
todoRouter.delete("/deleteToDo",auth,deleteToDo) // If request to '/todo/deleteToDo' is made via frontend, it will be handled by deleteToDo after middleware checks

// Exporting the toDo Router
export default todoRouter