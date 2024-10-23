import { TodoModel } from "../db/model.js"

export const addToDo = async function(req,res,next){
    try{
        const requestBody = req.body
        const objId = req.objId
        const toDoId = requestBody.id
        const title = requestBody.title
        const done = requestBody.done

        await TodoModel.create({
            userId : objId,
            id : toDoId,
            title : title,
            done : done
        })

        res.status(201).json({message : `To-Do with id ${toDoId} for user ${objId} created successfully`}) 
    }
    catch(error){
        res.status(500).json({message : `Error at backend : ${error.message}`})
    }
}

export const getToDos = async function(req,res,next){
    try{
        const objId = req.objId

        const response = await TodoModel.find({
            userId : objId
        })

        if(response){
            res.status(200).json({message : `To-Dos for user ${objId} fetched successfully`,response}) 
        }
        else{
            res.status(400).json({message: `To-Dos for user ${objId} fetch failed`})
        }
    }
    catch(error){
        res.status(500).json({message : `Error at backend : ${error.message}`})
    }
}

export const updateToDo = async function(req,res,next){
    try{
        const requestBody = req.body
        const objId = req.objId
        const toDoId = requestBody.id
        const title = requestBody.title
        const done = requestBody.done

        const response = await TodoModel.findOneAndUpdate({
            userId : objId,
            id : toDoId
        },{
            userId : objId,
            id : toDoId,
            title : title,
            done : done
        })

        if(response){
            res.status(200).json({message : `To-Do with id ${toDoId} for user ${objId} updated successfully`}) 
        }
        else{
            res.status(400).json({message: `To-Do with id ${toDoId} for user ${objId} update failed`})
        }
        
    }
    catch(error){
        res.status(500).json({message : `Error at backend : ${error.message}`})
    }
}

export const deleteToDo = async function(req,res,next){
    try{
        const requestBody = req.body
        const objId = req.objId
        const toDoId = requestBody.id
     
        const response = await TodoModel.findOneAndDelete({
            userId : objId,
            id : toDoId
        })

        if(response){
            res.status(200).json({message : `To-Do with id ${toDoId} for user ${objId} deleted successfully`}) 
        }
        else{
            res.status(400).json({message: `To-Do with id ${toDoId} for user ${objId} delete failed`})
        }
        
    }
    catch(error){
        res.status(500).json({message : `Error at backend : ${error.message}`})
    }
}


export default {addToDo,getToDos,updateToDo,deleteToDo}