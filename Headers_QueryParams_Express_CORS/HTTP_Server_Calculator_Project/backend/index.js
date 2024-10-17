// Create a basic caluclator backend 
// Now, cross origin resource sharing (CORS) requests are by default blocked, we need to mannually enable those

const express = require('express')
const cors = require('cors') // To allow cross origin request (i.e. request from other endpoints)

app = express()
app.use(cors({
    domains : ["http://127.0.0.1:5500/"]
}))
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

app.post('/add',function(req,res){
    const requestBody = req.body;

    if(requestBody && requestBody.a && requestBody.b){
        const ans = parseInt(requestBody.a) + parseInt(requestBody.b)
        res.status(200).json({answer:ans})
    }
    else{
        res.status(404).json({message:"Parameters not found."})
    }
})

app.post('/subtract',function(req,res){
    const requestBody = req.body;

    if(requestBody && requestBody.a && requestBody.b){
        const ans = parseInt(requestBody.a) - parseInt(requestBody.b)
        res.status(200).json({answer:ans})
    }
    else{
        res.status(404).json({message:"Parameters not found."})
    }
})

app.post('/multiply',function(req,res){
    const requestBody = req.body;

    if(requestBody && requestBody.a && requestBody.b){
        const ans = parseInt(requestBody.a) * parseInt(requestBody.b)
        res.status(200).json({answer:ans})
    }
    else{
        res.status(404).json({message:"Parameters not found."})
    }
})

app.post('/divide', function(req,res){
    const requestBody = req.body;

    if(requestBody && requestBody.a && requestBody.b){
        const ans = parseInt(requestBody.a) / parseInt(requestBody.b)
        res.status(200).json({answer:ans})
    }
    else{
        res.status(404).json({message:"Parameters not found."})
    }
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})