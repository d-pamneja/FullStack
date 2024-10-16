// Create a basic caluclator backend 
// Now, cross origin resource sharing (CORS) requests are by default blocked, we need to mannually enable those

const express = require('express')

app = express()
const port = 3000
app.use(express.json())

let requestCount = 0;
function requestCounter(req,res,next){ // Middleware
    requestCount = requestCount + 1;
    console.log(`The number of requests made till now : ${requestCount}. Latest request made by : ${req.path}`)
    next();
}

app.get('/admin',function(req,res){
    res.status(200).send(`The number of requests made till now (excluding this) are : ${requestCount}`)
})

app.use(requestCounter); // All endpoints below this will use our middleware

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

app.get('/divide', function(req,res){
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