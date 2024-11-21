import { Request,Response,NextFunction } from "express";
import { ContentModel, LinkModel } from "../db/model";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET


export const shareLink = async (req : Request, res: Response) : Promise<any> => {
    try{
        const requestBody = req.body

        if(requestBody){
            const setting = requestBody.share
            if(setting===true){
                // @ts-ignore
                const userID = new mongoose.Types.ObjectId(`${res.locals.jwtData}`)

                const shareToken = jwt.sign({ 
                    userID : userID,
                    share : setting
                },JWT_SECRET as any)

            
                const encodedToken = Buffer.from(shareToken).toString('base64url'); // URL-safe encoding 
                const link = `http://127.0.0.1:3001/share/viewBrain/${encodedToken}`;

                
                await LinkModel.create({
                    hash : link,
                    userID : userID
                })

                return res.status(201).json({message : `Sharable link activated for the brain of user ${userID}`,link})
            }
            else{ // Delete if they toggle off the share button
                // @ts-ignore
                const userID = new mongoose.Types.ObjectId(`${res.locals.jwtData}`)

                await LinkModel.deleteOne({
                    userID : userID
                })

                res.status(200).json({message:`Sharable link de-activated for the brain of user ${userID}`})
            }
        }
        else{
            return res.status(404).json({message:"Details to share not found."})
        }
    }
    catch(error : any){
        res.status(500).json({message : `Error in adding new content ${error.message}`})
    }
}

export const viewLink = async (req : Request, res: Response) : Promise<any> => {
    try{
        const shareToken = Buffer.from(req.params.uid, 'base64url').toString('utf-8');
        const decodedLink = jwt.verify(shareToken as any,JWT_SECRET as any)

        if(decodedLink){
            // @ts-ignore 
            const ID = decodedLink.userID
            const requestUserID = new mongoose.Types.ObjectId(`${ID}`)
            // @ts-ignore 
            const linkAccess = decodedLink.share

            const LinkResponse = await LinkModel.find({
                userID : requestUserID
            })

            if(LinkResponse && linkAccess===true){
                const contentResponse = await ContentModel.find({
                    // @ts-ignore 
                    userID : requestUserID
                })
                if(contentResponse){
                    res.status(200).json({message : "Access to this brain has been granted.",contentResponse})
                }
            }
            else{
                res.status(403).json({message : "Access to this brain has been deined."})
            }
        }
        else{
            return res.status(404).json({message:"Invalid share link."})
        }
    }
    catch(error : any){
        res.status(500).json({message : `Error in adding new content ${error.message}`})
    }
}

export default {shareLink,viewLink}