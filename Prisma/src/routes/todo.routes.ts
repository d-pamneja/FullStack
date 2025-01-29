import { Router } from "express";
import { CreateToDo, DeleteToDo, UpdateToDo } from "../controllers/todos.controllers";

export const ToDoRouter = Router()

ToDoRouter.post("/createToDo",CreateToDo)
ToDoRouter.put("/updateToDo",UpdateToDo)
ToDoRouter.delete("/deleteToDo",DeleteToDo)

export default {ToDoRouter}