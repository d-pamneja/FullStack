import { Request,Response,NextFunction } from "express";
import { dbClient } from "../db/connect.db";

export const CreateUser = async ( req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
        const username = req.body.username 
        const password = req.body.password
        const age = req.body.age
        let city = req.body.city 
        let pincode = req.body.pincode

        const response = await dbClient.user.create({
            data : {
                username : username,
                password : password,
                age : age,
                city : city || undefined,
                pincode : pincode || undefined
            }
        })
        
        if(!response){
            return res.status(400).json({message : "Error in adding new user"})
        }

        return res.status(201).json({message : "New user created successfully",response})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error})
    }
}

export const UpdateUser = async ( req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
        const id = req.body.id
        const username = req.body.username
        const password = req.body.password
        const age = req.body.age
        const city = req.body.city
        const pincode = req.body.pincode

        const response = await dbClient.user.update({
            where : {
                id : id
            },
            data: {
                username: username || undefined,
                password: password || undefined,
                age: age || undefined,
                city: city || undefined,
                pincode: pincode || undefined
            }
        })
        
        if(!response){
            return res.status(400).json({message : "Error in updating user"})
        }

        return res.status(200).json({message : "User updated successfully",response})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error})
    }
}

export const DeleteUser = async ( req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
        const id = req.body.id

        const response = await dbClient.user.delete({
            where : {
                id : id
            },
        })
        
        if(!response){
            return res.status(400).json({message : "Error in deleting user"})
        }

        return res.status(200).json({message : "User deleted successfully",response})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error})
    }
}

export default {CreateUser,UpdateUser,DeleteUser}