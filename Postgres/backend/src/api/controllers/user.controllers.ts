import { Request,Response,NextFunction } from "express";
import { pgClient } from "../../db/config.db";

export const SignUpUser = async function(
    req:Request,
    res:Response,
    next:NextFunction
): Promise<any>{
    try {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        const street = req.body.street;
        const city = req.body.city;
        const country = req.body.country;
        const pincode = req.body.pincode

        // Naive Method - Prone to SQL Injections
        // const insertQuery =  `INSERT INTO users (username,email,password) VALUES ('${username}','${email}','${password}');` // Bad way to do it, highly vulnerable to SQL Injections
        // const response = await pgClient.query(insertQuery);

        // // Better Method - SQL Injections Protection
        // const insertQuery =  `INSERT INTO users (username,email,password) VALUES ($1,$2,$3);`
        // const response = await pgClient.query(insertQuery,[username,email,password]); // This way, any injection is not executed but rather stored as a string, as both the query and values are never appeneded and reach the database individually
        // if(!response){
        //     res.status(403).json({message : `User with name ${username} exists.`})
        // }

        // Best Method - SQL Injections Protection + Transactions
        // Now, if we want to run multiple queries, we do it with the concept of transactions in such a way that 
        // either both of them fail, or none do. For example here, we will also set an addresses for the user as they sign up
        
        await pgClient.query(`BEGIN;`)
        const insertQuery =  `INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id;`
        const insertAddressQuery =  `INSERT INTO address (street,city,country,pincode,userid) VALUES ($1,$2,$3,$4,$5);`

        const insertUserResponse = await pgClient.query(insertQuery,[username,email,password]);
        const userid = insertUserResponse.rows[0].id;
        const insertUserAddressResponse = await pgClient.query(insertAddressQuery,[street,city,country,pincode,userid])

        await pgClient.query(`COMMIT;`)

        return res.status(201).json({message: `New user with ${username} and their address created successfully.`})

    } catch (error : any) {
        res.status(400).json({message : "New User could not be created!",details : error})
    }
}

export const viewUser = async function (
    req : Request,
    res : Response,
    next : NextFunction
) : Promise<any>{
    try {
        const userid = req.params.userid
        const jointype = req.params.jointype

        const viewQuery = await pgClient.query(`SELECT u.id,u.username,u.email,a.street,a.city,a.country,a.pincode FROM users AS u INNER JOIN address AS a ON u.id=a.userid WHERE u.id=$1`,[userid])

        if(!viewQuery){
            return res.status(400).json({message : "Could not view the joined table"}) 
        }

        console.log(viewQuery)
        return res.status(200).json({message : "Successfully fetched the join table",viewQuery})
    } catch (error) {
        res.status(500).json({message : "Server error in fetching the view query"})
    }
}

export const deleteUser = async function (
    req : Request,
    res : Response, 
    next : NextFunction
): Promise<any>{ 
    try {
        const userid = req.body.userid
        const username = req.body.username
        const password = req.body.password

        const deleteQuery = "DELETE FROM users WHERE id=$1 AND username=$2 AND password=$3"
        const response = await pgClient.query(deleteQuery,[userid,username,password])

        if(!response){
            res.status(400).json({message : "Could not delete the user",response})
        }

        return res.status(200).json({message : "Deleted the user successfully",response})
    } catch (error : any) {
        res.status(500).json({message : "Error in deleting the user",detail : error.detail})
    }
}