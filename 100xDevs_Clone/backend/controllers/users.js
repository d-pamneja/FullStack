import { UserModel,CourseModel,PurchasesModel} from '../db/model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import mongoose from 'mongoose';
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET



// Functionalities
export const signUp = async function(req,res){ // Will bypass checkCredentials middleware first
    try{
        const requestBody = req.body
        const name = requestBody.name
        const email = requestBody.email
        const password = requestBody.password
        const hashedPassword = await bcrypt.hash(password,5)

        await UserModel.create({
            name : name,
            email : email,
            password : hashedPassword,
            type : "user"
        })

        res.status(201).json({message: `New user with ${email} created successfully.`})
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const login = async function(req,res){ // Will pass checkCredentials middleware first
    try{
        const requestBody = req.body
        const email = requestBody.email
        const password = requestBody.password

        const response = await UserModel.findOne({
            email : email
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

// All endpoints below will only be passed once authenticated
export const logout = function(req,res){
    try{
        return res.status(200).json({message:`User with ${req.objId} object id successfully logged out.`})
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

export const buyCourse = async function(req,res){ 
    try{
        const requestBody = req.body
        const courseId = requestBody.courseId
        const adminId = await CourseModel.findOne({
            _id : new mongoose.Types.ObjectId(`${courseId}`)
        })

        await PurchasesModel.create({
            courseId : new mongoose.Types.ObjectId(`${courseId}`),
            userId : new mongoose.Types.ObjectId(`${req.objId}`),
            adminId : adminId.adminId
        })

        res.status(201).json({message : `User ${req.objId} made a purchase of course ${courseId}`})
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const courseIsPurchased = async function(req,res){
    try{
        const requestBody = req.body
        const courseId = requestBody.courseId
        
        const response = await PurchasesModel.findOne({
            courseId : new mongoose.Types.ObjectId(`${courseId}`)
        })

        if(response){
            res.status(200).json({message : "This course is purchased by the user"}) 
        }
        else{
            res.status(400).json({message: "This course is not purchased by the user"})
        }

    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const viewCourse = async function(req,res){ 
    try{
        const requestBody = req.body
        const courseId = requestBody.courseId

        const response = await CourseModel.findOne({
            _id : new mongoose.Types.ObjectId(`${courseId}`)
        })

        if(response){
            res.status(200).json({message : `Course details for ${courseId} fetched successfully`,response})
        }
        else{
            res.status(403).json({message:`Course ${courseId} is not purchased by the user ${req.objId}`})
        }
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const viewMyCourses = async function(req,res){ 
    try{
        const userId = req.objId

        const purchases = await PurchasesModel.find({
            userId : new mongoose.Types.ObjectId(`${req.objId}`)
        })

        if(purchases){
            const courses = purchases.map(course=>{return course.courseId})
            const response = await CourseModel.find({
                _id : courses.map(course=>{return course})
            })

            if(response){
                res.status(200).json({message:`Courses of user ${req.objId} fetched successfully`,response})
            }
            else{
                res.status(400).json({message:`Courses of user ${req.objId} fetched failed`})
            }
        }
        else{
            res.status(400).json({message:`No courses found for user ${userId}`})
        }
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const viewAllCourses = async function(req,res){ 
    try{ 
        const response = await CourseModel.find({})

        if(response){
            res.status(200).json({message : `All courses available fetched successfully`,response}) 
        }
        else{
            res.status(400).json({message: `All courses available fetched successfully`})
        }

    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export default {signUp,login,logout,buyCourse,courseIsPurchased,viewCourse,viewAllCourses,viewMyCourses}
