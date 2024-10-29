import { UserModel,CourseModel, PurchasesModel} from '../db/model.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'; 
import mongoose from 'mongoose';

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

// Admin Functionalties
export const adminSignUp = async function(req,res){ // Will bypass checkCredentials middleware first
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
            type : "admin"
        })

        res.status(201).json({message: `New admin with ${email} created successfully.`})
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const adminLogin = async function(req,res){ // Will pass checkCredentials middleware first
    try{
        const requestBody = req.body
        const email = requestBody.email
        const password = requestBody.password

        const response = await UserModel.findOne({
            email : email,
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

// All endpoints below will only be passed once authenticated
export const adminLogout = function(req,res){ 
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
        const requestBody = req.body
        const title = requestBody.title
        const description = requestBody.description
        const price = requestBody.price
        const imgUrl = requestBody.imgUrl

        await CourseModel.create({
            adminId : req.objId,
            title : title,
            description : description,
            price : price,
            imgUrl : imgUrl
        })

        res.status(201).json({message:`Course with title ${title} created successfully`})
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const updateCourse = async function(req,res){ 
    try{
        const requestBody = req.body
        const courseId = requestBody.courseId
        const title = requestBody.title
        const description = requestBody.description
        const price = requestBody.price
        const imgUrl = requestBody.imgUrl

        const response = await CourseModel.findOneAndUpdate({
            _id : courseId,
            adminId : req.objId,
        },{
            _id : new mongoose.Types.ObjectId(`${courseId}`),
            adminId : req.objId,
            title : title,
            description : description,
            price : price,
            imgUrl : imgUrl
        })

        if(response){
            res.status(200).json({message : `Course with id ${courseId} by admin ${req.objId} updated successfully`}) 
        }
        else{
            res.status(400).json({message: `Course with id ${courseId} by admin ${req.objId} update failed`})
        }
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const deleteCourse = async function(req,res){ 
    try{
        const requestBody = req.body
        const courseId = requestBody.courseId
     
        const response = await CourseModel.findOneAndDelete({
            _id : courseId,
            adminId : req.objId
        })

        if(response){
            res.status(200).json({message : `Course with id ${courseId} by admin ${req.objId} deleted successfully`}) 
        }
        else{
            res.status(400).json({message: `Course with id ${courseId} by admin ${req.objId} delete failed`})
        }
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const viewAdminAllCourses = async function(req,res){ 
    try{
        const response = await CourseModel.find({
            adminId : req.objId
        })

        if(response){
            res.status(200).json({message : `All courses created by admin :  ${req.objId} fetched successfully`,response}) 
        }
        else{
            res.status(400).json({message: `All courses created by admin :  ${req.objId} fetch failed`})
        }
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export const viewMetrics = async function(req,res){ 
    try{
        const response = await PurchasesModel.find({
            adminId : new mongoose.Types.ObjectId(`${req.objId}`)
        })

        if(response){
            const sales = response.length
            const courses = await CourseModel.find({
                _id : response.map(purchase=>{return purchase.courseId})
            })
            let revenues = courses.reduce((revenue, course) => {return revenue + course.price;}, 0); // this iterates through each course in courses, adding each course.price to the revenue accumulator, which starts at 0.

            res.status(200).json({message : `Metrics from the library of admin :  ${req.objId} loaded successfully`,sales,revenues}) 
        }
        else{
            res.status(400).json({message: `Metrics from the library of admin :  ${req.objId} not loaded`})
        }

    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
}

export default {adminSignUp,adminLogin,adminLogout,addCourse,updateCourse,deleteCourse,viewAdminAllCourses,viewMetrics}
