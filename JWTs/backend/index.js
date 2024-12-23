// There is a problem with using `stateful` tokens.
// By stateful here, we mean that we need to store these tokens in a variable right now (and eventually in a database). 

// ## Problem
// The problem is that we need to `send a request to the database` every time the user wants to hit an `authenticated endpoint`. We are hitting
// the database too many times at each request

// ## Solution
// JWTs, or JSON Web Tokens, are a compact and self-contained way to represent information between two parties. They are commonly used for authentication and information exchange in web applications.
// **JWTs are Stateless**: JWTs contain all the information needed to authenticate a request, so the server doesn’t need to store session data. All the `data` is stored in the token itself.

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const z = require('zod')

const port = 3000
const JWT_SECRET = "random@123"
app = express()
app.use(express.json())
app.use(cors({
    domains : ["http://127.0.0.1:5500/"]
}))


let users = []
let logInStatus = false
const userSchema = z.object({
    id :z.string().email(),
    password : z.string().min(5)
})

function logger(req,res,next){
    try{
        console.log(`${req.method} - ${req.url} - ${new Date().toISOString()}`)
        return next();
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
}

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
        const user = users.find(user => user.id === requestBody.id)

        if(user){
            return res.status(400).json({message : `The user with email ${user.id} is already registered. Try to sign in`})
        }
        else{
            next()
        }

    }
    catch(error){
        return res.status(500).json({message:`Error at backend with error : ${error.message}`})
    }
}

function auth(req,res,next){
    try{
        if(logInStatus){
            const requestAuthorization = req.headers.authorization
            const decodedInfo = jwt.verify(requestAuthorization,JWT_SECRET)
    
            if(!decodedInfo){
                return res.status(401).json({message:"Incorrect Authentication"})
            }
            else{
                req.username = decodedInfo.username
                return next();
            }
            
        }
        else{
            return res.status(401).json({message:"Not logged in."})
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

app.use(logger)


app.get('/',function(req,res){
    res.status(200).send("App is live.")
    // res.sendFile(__dirname + "/frontend/public/index.html"); // To run on the same port
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

app.post('/login',checkCredentials,function(req,res){
    try{
        if(!logInStatus){
            const requestBody = req.body
            const id = requestBody.id
            const password = requestBody.password

            const user = users.find(user => user.id === id);

            if(user && user.password===password){
                const token = jwt.sign({ // This creates a JWT which we will give to the user
                    username : id
                },JWT_SECRET)

                logInStatus = true;
                return res.status(200).json({message:"JWT Generated",token})
            }
            else{
                if(!user){
                    res.status(404).json({message:`Incorrect User ID.`})
                }
                else if(user && user.password!=password){
                    res.status(404).json({message:`Incorrect password for : ${id}.`})
                }
                
            }
        }
        else{
            res.status(400).json({message:"You are already logged in."})
        }
        
    }
    catch(error){
        res.status(500).json({message: `Error at backend with error : ${error.message}`})
    }
})

// Authorised Endpoint - You can send a token to authorise access to certain pages
app.get('/me',auth,function(req,res){
    try{
        const id = req.username
        const user = users.find(user => user.id === id) // Now, we can query the database with this username which is JWT authenticated

        if(user){
            res.status(200).json({message:`Hi, ${user.id} with the password ${user.password}`})
        }
        else{
            res.status(404).json({message:"User does not exist"})
        }
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" }); 
    }
    

})

app.get('/logout',auth,function(req,res){
    try{
        logInStatus = false;
        return res.status(200).json({message:`User ${req.username} successfully logged out.`})
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
    
})


app.listen(port,()=>{
    console.log(`Listening at port : ${port}`)
})
