import z from 'zod';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

const signUpUserSchema = z.object({
    name : z.string(),
    id : z.string().email(),
    password : z.string().min(5)
})

const loginUserSchema = z.object({
    id : z.string().email(),
    password : z.string().min(5)
})

export const logger = function (req,res,next){
    try{
        console.log(`${req.method} - ${req.url} - ${new Date().toISOString()}`)
        return next();
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const checkCredentials =  function(req,res,next){
    try{
        const requestBody = req.body
        if(requestBody && requestBody.id && requestBody.password){
            const validationResult = signUpUserSchema.safeParse(requestBody);

            if (!validationResult.success) {
                return res.status(400).json({message: "Validation error", details: validationResult.error.issues});
            }
            else{
                next()
            }
        }
        else{
            if(!requestBody){
                res.status(400).json({message:"Invalid request body"})
            }
            else if(!requestBody.name){
                res.status(404).json({message:"User name not found."})
            }
            else if(!requestBody.id){
                res.status(404).json({message:"User id not found."})
            }
            else if(!requestBody.password){
                res.status(404).json({message:"Password not found."})
            }
        }
    }
    catch(error){
        return res.status(500).json({message:`Error at backend with error : ${error.message}`})
    }
}

export const loginCheckCredentials =  function(req,res,next){
    try{
        const requestBody = req.body
        if(requestBody && requestBody.id && requestBody.password){
            const validationResult = loginUserSchema.safeParse(requestBody);

            if (!validationResult.success) {
                return res.status(400).json({message: "Validation error", details: validationResult.error.issues});
            }
            else{
                next()
            }
        }
        else{
            if(!requestBody){
                res.status(400).json({message:"Invalid request body"})
            }
            else if(!requestBody.id){
                res.status(404).json({message:"User id not found."})
            }
            else if(!requestBody.password){
                res.status(404).json({message:"Password not found."})
            }
        }
    }
    catch(error){
        return res.status(500).json({message:`Error at backend with error : ${error.message}`})
    }
}


export const auth = function (req,res,next){
    try{
        const requestAuthorization = req.headers.authorization
        const decodedInfo = jwt.verify(requestAuthorization,JWT_SECRET)

        if(!decodedInfo){
            return res.status(401).json({message:"Incorrect Authentication"})
        }
        else{
            req.objId = decodedInfo.Id
            return next();
        }
    }
    catch(error){
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
    }
}

export default {logger,checkCredentials,loginCheckCredentials,auth}