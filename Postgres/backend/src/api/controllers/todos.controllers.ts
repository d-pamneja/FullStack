import { Request,Response,NextFunction } from "express";
import { pgClient } from "../../db/config.db";

export const createTodo = async function(
    req : Request,
    res : Response,
    next : NextFunction
){
    try {
        const title = req.body.title;
        const description = req.body.description;
        const userid = req.body.userid;

        const insertQuery =  `INSERT INTO todo (title,description,userid) VALUES ($1,$2,$3);`
        const response = await pgClient.query(insertQuery,[title,description,userid]);
        
        if(!response){
            res.status(400).json({message : "Could not create todo",response})
        }

        res.status(201).json({message : "Query to create new user successfully executed.",response})
    } catch (error) {
        console.log("Could not insert the user in database : ", error)
    }
}