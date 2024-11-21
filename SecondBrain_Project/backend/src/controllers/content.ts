import { ContentModel,LinkModel,TagModel,UserModel } from "../db/model";
import { Request,Response } from "express";
import mongoose from 'mongoose';

export const addContent = async (req:Request, res:Response) : Promise<any> =>{
    try{
        const requestBody = req.body

        if(requestBody){
            const title = requestBody.title
            const link = requestBody.link
            const type = requestBody.type
            const tags = requestBody.tags

            // @ts-ignore
            const userID = new mongoose.Types.ObjectId(`${res.locals.jwtData}`)

            // Setting new tags
            tags.map(async (tag : string)=>{
                const response = await TagModel.findOne({
                    title : tag
                })

                if(!response){
                    await TagModel.create({
                        title : tag
                    })
                }
            })

            
            let tagIds : mongoose.Types.ObjectId[] = []

            await Promise.all( // Since map function does not wait for any async functions, it pushes before fetching from mongoDB, hence we use Promise All, which ensures all promises are ensured before moving to next line
                tags.map(async (tag : String)=>{
                    const tagCreds = await TagModel.findOne({
                        title : tag
                    })
                    
                    const currentTagID = tagCreds!._id
                    tagIds.push(currentTagID!)
                })
            )

            await ContentModel.create({
                title : title,
                link : link,
                type : type,
                tags : tagIds,
                userID : userID
            })

            return res.status(201).json({message : "New content added."})
        

        }
        else{
            res.status(400).json({message : "Content details missing"})
        }
    }
    catch(error : any){
        res.status(500).json({message : `Error in adding new content ${error.message}`})
    }

}

export const viewContent = async (req : Request, res:Response) : Promise<any> =>{
    try{
        // @ts-ignore 
        const userID = new mongoose.Types.ObjectId(`${res.locals.jwtData}`)

        const response = await ContentModel.find({
            userID : userID
        })

        if(!response){
            return res.status(404).json({message : "Error in fetching the content"})
        }

        return res.status(200).json({message : `All content for the user ${userID}`,response})
    }
    catch(error : any){
        res.status(500).json({message : `Error in adding new content ${error.message}`})
    }
}

export const deleteContent = async (req : Request, res:Response) : Promise<any> =>{
    try{
        // @ts-ignore 
        const userID = new mongoose.Types.ObjectId(`${res.locals.jwtData}`)
        const requestBody = req.body

        if(requestBody){
            const contentID = new mongoose.Types.ObjectId(`${requestBody.contentID}`)

            const response = await ContentModel.deleteOne({
                _id : contentID,
                userID : userID
            })

            if(!response){
                res.status(403).json({message : "You are trying to delete "})
            }

            return res.status(200).json({message : "Content deleted successfully"})
        }
        else{
            res.status(400).json({message : "Content details missing"})
        }
    }
    catch(error : any){
        res.status(500).json({message : `Error in adding new content ${error.message}`})
    }
}

export default {addContent,viewContent,deleteContent}