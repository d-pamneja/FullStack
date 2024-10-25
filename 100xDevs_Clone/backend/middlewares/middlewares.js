import z from 'zod';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

export const logger = function (req,res,next){
    try{
        console.log(`${req.method} - ${req.url} - ${new Date().toISOString()}`)
        return next();
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
}

const signUpUserSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(5).refine((password) => /[A-Z]/.test(password), {message: "Required atleast one uppercase character"}).refine((password) => /[a-z]/.test(password), {message: "Required atleast one lowercase character"}).refine((password) => /[0-9]/.test(password), {message: "Required atleast one number"}).refine((password) => /[!@#$%^&*]/.test(password), {message: "Required atleast one special character"}),
    type : z.string()
})

const loginUserSchema = z.object({
    id : z.string().email(),
    password : z.string()
})

// USER
export const checkCredentials =  function(req,res,next){ // Only to be used for sign-up
    try{
        const requestBody = req.body
        if(requestBody && requestBody.name && requestBody.email && requestBody.password){
            const validationResult = signUpUserSchema.safeParse(requestBody);

            if (!validationResult.success) {
                const errors = validationResult.error.issues
                let errorsArray = errors.map(error=>{
                    return error.message
                })


                return res.status(400).json({message: "Validation error(s)", details: errorsArray});
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
            else if(!requestBody.email){
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
        if(requestBody && requestBody.email && requestBody.password){
            const validationResult = loginUserSchema.safeParse(requestBody);

            if (!validationResult.success) {
                const errors = validationResult.error.issues
                let errorsArray = errors.map(error=>{
                    return error.message
                })

                return res.status(400).json({message: "Validation error", details: errorsArray});
            }
            else{
                next()
            }
        }
        else{
            if(!requestBody){
                res.status(400).json({message:"Invalid request body"})
            }
            else if(!requestBody.email){
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

// ADMIN
export const adminAuth = function (req,res,next){
    try{
        const requestAuthorization = req.headers.authorization
        const decodedInfo = jwt.verify(requestAuthorization,JWT_SECRET)

        if(!decodedInfo){
            return res.status(401).json({message:"Incorrect Authentication"})
        }
        else{
            if(decodedInfo.type==="admin"){
                req.objId = decodedInfo.Id
                return next();
            }
            else{
                return res.status(403).json({ message: "Access not allowed" });
            }
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

export default {logger,checkCredentials,loginCheckCredentials,auth,adminAuth}