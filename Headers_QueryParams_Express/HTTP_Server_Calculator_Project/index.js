// Create a basic caluclator backend 

const express = require('express')

app = express()
const port = 3000
app.use(express.json())

app.get('/add',function(req,res){
    const requestParams = req.query;

    if(requestParams && requestParams.a && requestParams.b){
        const ans = parseInt(requestParams.a) + parseInt(requestParams.b)
        res.status(200).send(`The sum of the two numbers is ${ans}.`)
    }
    else{
        res.status(404).send("Parameters not found.")
    }
})

app.get('/subtract',function(req,res){
    const requestParams = req.query;

    if(requestParams && requestParams.a && requestParams.b){
        const ans = parseInt(requestParams.a) - parseInt(requestParams.b)
        res.status(200).send(`The difference of the two numbers is ${ans}.`)
    }
    else{
        res.status(404).send("Parameters not found.")
    }
})

app.get('/multiply',function(req,res){
    const requestParams = req.query;

    if(requestParams && requestParams.a && requestParams.b){
        const ans = parseInt(requestParams.a) * parseInt(requestParams.b)
        res.status(200).send(`The product of the two numbers is ${ans}.`)
    }
    else{
        res.status(404).send("Parameters not found.")
    }
})

app.get('/divide',function(req,res){
    const requestParams = req.query;

    if(requestParams && requestParams.a && requestParams.b){
        const ans = parseInt(requestParams.a) / parseInt(requestParams.b)
        res.status(200).send(`The division of the two numbers is ${ans}.`)
    }
    else{
        res.status(404).send("Parameters not found.")
    }
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})