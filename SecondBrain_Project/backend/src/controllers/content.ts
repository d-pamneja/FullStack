import { ContentModel,LinkModel,TagModel,UserModel } from "../db/model";
import { Request,Response } from "express";
import mongoose from 'mongoose';

export const addContent = async (req:Request,res:Response) : Promise<any> =>{
    try{
        const requestBody = req.body

        if(requestBody){
            const title = requestBody.title
            const link = requestBody.link
            const type = requestBody.type
            const tags = requestBody.tags

            // @ts-ignore
            const userID = new mongoose.Types.ObjectId(`${req.userObjID}`)

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
            
            await LinkModel.create({
                hash : link,
                userID : userID
            })

            

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

export default {addContent}