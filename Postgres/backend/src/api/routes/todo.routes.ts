import { Router } from "express";
import { createTodo } from "../controllers/todos.controllers";

export const todoRouter = Router();

todoRouter.post("/create",createTodo)