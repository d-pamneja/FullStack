import { UserModel } from '../db/model.js'
import { CourseModel } from '../db/model.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'; 
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

// Admin Functionalties
export const adminSignUp = async function(req,res){ // Will bypass checkCredentials middleware first
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
            type : "admin"
        })

        res.status(201).json({message: `New admin with ${id} created successfully.`})
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const adminLogin = async function(req,res){ // Will pass checkCredentials middleware first
    try{
        const requestBody = req.body
        const id = requestBody.id
        const password = requestBody.password

        const response = await UserModel.findOne({
            email : id,
            type : "admin"
        })

        if(!response){
            res.status(403).json({message: "Incorrect user id."})
            return;
        }

        const passwordMatch = await bcrypt.compare(password, response.password)
        if(passwordMatch){
            const adminToken = jwt.sign({ // This creates a JWT which we will give to the user
                Id : response._id.toString(),
                email : response.email,
                type : response.type
            },JWT_SECRET)

            return res.status(200).json({message:"Admin JWT Generated",adminToken})
        }
        else{
            res.status(403).json({message: "Incorrect password."})
        }
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const adminLogout = function(req,res){ // Will pass auth middleware first
    try{
        return res.status(200).json({message:`User with ${req.objId} object id successfully logged out.`})
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

// Functionalities
export const addCourse = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const addCourseContent = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}


export const updateCourse = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const deleteCourse = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const viewAdminAllCourses = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const viewMetrics = async function(req,res){ 
    try{
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export default {adminSignUp,adminLogin,adminLogout,addCourse,updateCourse,deleteCourse,viewAdminAllCourses,viewMetrics}
