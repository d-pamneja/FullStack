const express = require('express')
const cors = require('cors')
const z = require('zod')

const port = 3000
app = express()
app.use(express.json())
app.use(cors({
    domains : ["http://127.0.0.1:5500/"]
}))

let users = []
const userSchema = z.object({
    id :z.string().email(),
    password : z.string().min(5)
})

function checkCredentials(req,res,next){
    try{
        const requestBody = req.body
        if(requestBody && requestBody.id && requestBody.password){
            const validationResult = userSchema.safeParse(requestBody);

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

function checkPreExistingUser(req,res,next){
    try{
        const requestBody = req.body;
        for(let i=0;i<users.length;i++){
            if(users[i].id == requestBody.id){
                return res.status(400).json({message : `The user with email ${requestBody.id} is already registered. Try to sign in`})
            }
        }

        next()
    }
    catch(error){
        return res.status(500).json({message:`Error at backend with error : ${error.message}`})
    }
}

function generateToken(n){
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const len = characters.length

    for(let i=0;i<len;i++){
        if(token.length==n){
            return token;
        }

        token += characters[Math.floor(Math.random() * (len-1))]
    }

    return token
}

function validateExistingUserAndAddToken(req,res,next){
    try{
        const requestBody = req.body
        const id = requestBody.id
        const password = requestBody.password

        for(let i=0;i<users.length;i++){
            if(users[i].id==id){
                if(users[i].password==password){
                    if(users[i].token && users[i].token==requestBody.token){ // If logging in after first time and token valid
                        return next()
                    }
                    else if(!users[i].token){ // Logging in first time, so create new token
                        users[i].token = generateToken(10)
                        return next()
                    }
                    else if(users[i].token!=requestBody.token){ // Logging in after first time and invalid token
                        return res.status(403).json({message:"Token validation incorrect"})
                    }
                }
                else{
                    return res.status(403).json({message:"Incorret Password"})
                }
            }
        }

        res.status(404).json({message:`User with id : ${id} not found in database.`})
    }
    catch(error){
        return res.status(500).json({message:`Error at backend with error : ${error.message}`})
    }
}


app.get('/',function(req,res){
    res.status(200).send("App is live.")
})

app.get('/currentUsers',function(req,res){
    res.status(200).json({message:`There exits a total of ${users.length} users.`,users})
})

app.post('/sign-up',checkCredentials,checkPreExistingUser,function(req,res){
    try{
        const requestBody = req.body
        const id = requestBody.id
        const password = requestBody.password

        users.push({
            "id" : id,
            "password" : password,
        })

        res.status(201).json({message: `New user with ${id} created successfully.`})
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
})

app.post('/login',checkCredentials,validateExistingUserAndAddToken,function(req,res){
    try{
        const requestBody = req.body
        res.status(200).json({message:`Welcome to the dashboard`})
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
})

// Authorised Endpoint - You can send a token to authorise access to certain pages
app.get('/me',function(req,res){
    const requestAuthorization = req.headers.authorization
    const user = users.find(user => user.token === requestAuthorization)

    if(user){
        res.status(200).json({message:`Hi, ${user.id}`})
    }
    else{
        res.status(401).json({message:"Incorrect Authentication"})
    }

})


app.listen(port,()=>{
    console.log(`Listening at port : ${port}`)
})