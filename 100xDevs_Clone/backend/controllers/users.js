import { UserModel } from '../db/model.js'
import { CourseModel } from '../db/model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET



// Functionalities
export const signUp = async function(req,res){ // Will bypass checkCredentials middleware first
    try{
        const requestBody = req.body
        const name = requestBody.name
        const id = requestBody.id
        const password = requestBody.password
        const hashedPassword = await bcrypt.hash(password,5)

        await UserModel.create({
            name : name,
            email : id,
            password : hashedPassword,
            type : "user"
        })

        res.status(201).json({message: `New user with ${id} created successfully.`})
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const login = async function(req,res){ // Will pass checkCredentials middleware first
    try{
        const requestBody = req.body
        const id = requestBody.id
        const password = requestBody.password

        const response = await UserModel.findOne({
            email : id
        })

        if(!response){
            res.status(403).json({message: "Incorrect user id."})
            return;
        }

        const passwordMatch = await bcrypt.compare(password, response.password)
        if(passwordMatch){
            const token = jwt.sign({ // This creates a JWT which we will give to the user
                Id : response._id.toString()
            },JWT_SECRET)

            return res.status(200).json({message:"JWT Generated",token})
        }
        else{
            res.status(403).json({message: "Incorrect password."})
        }
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const logout = function(req,res){ // Will pass auth middleware first
    try{
        return res.status(200).json({message:`User with ${req.objId} object id successfully logged out.`})
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

export const buyCourse = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const viewCourse = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}
export const viewMyCourses = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const viewAllCourses = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export default {signUp,login,logout,buyCourse,viewCourse,viewAllCourses,viewMyCourses}
