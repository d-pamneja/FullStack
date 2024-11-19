import { UserModel} from '../db/model'
import { Request,Response,NextFunction } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET



// Functionalities
export const signUp = async function(req : Request,res : Response): Promise<any>{ // Will bypass checkCredentials middleware first
    try{
        const requestBody = req.body
        const username = requestBody.username
        const password = requestBody.password
        const hashedPassword = await bcrypt.hash(password,5)

        const response = await UserModel.create({
            username : username,
            password : hashedPassword,
        })

        if(!response){
            res.status(403).json({message : `User with name ${username} exists.`})
        }

        res.status(201).json({message: `New user with ${username} created successfully.`})
    }
    catch(error : any){
        if(error.errorResponse.code==11000){
            res.status(500).json({message: `Username already exists. Kindly login`})
        }
        else{
            res.status(500).json({message: `Error at backend with error : ${error.message}`})
        }   
    }
}

export const login = async function(req : Request,res : Response) : Promise<any>{ // Will pass checkCredentials middleware first
    try{
        const requestBody = req.body
        const username = requestBody.username
        const password = requestBody.password

        const response = await UserModel.findOne({
            username : username
        })

        if(!response){
            res.status(403).json({message: "Incorrect username"})
            return;
        }

        const passwordMatch = await bcrypt.compare(password, response.password!) // The exclamation mark is the non null assertion. Basically us telling that this WILL NOT BE NULL, even if it looks like it
        if(passwordMatch){
            const token = jwt.sign({ // This creates a JWT which we will give to the user
                Id : response._id.toString()
            },JWT_SECRET as any)

            return res.status(200).json({message:"JWT Generated",token})
        }
        else{
            res.status(403).json({message: "Incorrect password."})
        }
    }
    catch(error : any){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

// All endpoints below will only be passed once authenticated


export default {signUp,login}
