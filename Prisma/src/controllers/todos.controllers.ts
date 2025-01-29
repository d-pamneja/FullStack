import { Request,Response,NextFunction } from "express";
import { dbClient } from "../db/connect.db";

export const CreateToDo = async ( req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
        const title = req.body.title 
        const description = req.body.description
        const status = req.body.status
        const userID = req.body.userID 

        const response = await dbClient.todo.create({
            data : {
                title : title,
                description : description,
                status : status || undefined,
                user_id : userID
            }
        })
        
        if(!response){
            return res.status(400).json({message : "Error in adding new todo"})
        }

        return res.status(201).json({message : "New ToDo created successfully",response})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error})
    }
}

export const UpdateToDo = async ( req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
        const id = req.body.id
        const userID = req.body.userID 
        const title = req.body.title 
        const description = req.body.description
        const status = req.body.status

        const response = await dbClient.todo.update({
            where : {
                id : id,
                user_id : userID
            },
            data: {
               title : title || undefined,
               description : description || undefined,
               status : status || undefined,
            }
        })
        
        if(!response){
            return res.status(400).json({message : "Error in updating todo"})
        }

        return res.status(200).json({message : "ToDo updated successfully",response})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error})
    }
}

export const DeleteToDo = async ( req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
        const id = req.body.id

        const response = await dbClient.todo.delete({
            where : {
                id : id
            },
        })
        
        if(!response){
            return res.status(400).json({message : "Error in deleting todo"})
        }

        return res.status(200).json({message : "ToDo deleted successfully",response})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error})
    }
}

export default {CreateToDo,UpdateToDo,DeleteToDo}