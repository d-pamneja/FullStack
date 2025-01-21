import { Request,Response,NextFunction } from "express";
import { pgClient } from "../../db/config.db";

export const SignUpUser = async function(
    req:Request,
    res:Response,
    next:NextFunction
){
    try {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        // Naive Method - Prone to SQL Injections
        // const insertQuery =  `INSERT INTO users (username,email,password) VALUES ('${username}','${email}','${password}');` // Bad way to do it, highly vulnerable to SQL Injections
        // const response = await pgClient.query(insertQuery);

        // Better Method 
        const insertQuery =  `INSERT INTO users (username,email,password) VALUES ($1,$2,$3);`
        const response = await pgClient.query(insertQuery,[username,email,password]); // This way, any injection is not executed but rather stored as a string, as both the query and values are never appeneded and reach the database individually
        if(!response){
            res.status(403).json({message : `User with name ${username} exists.`})
        }

        res.status(201).json({message: `New user with ${username} created successfully.`})

    } catch (error : any) {
        res.status(400).json({message : "New User could not be created!",details : error.detail})
    }
}