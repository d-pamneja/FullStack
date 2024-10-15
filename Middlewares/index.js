// Ticket Checker

const express = require('express');
const port = 3000;


var app = express();
app.use(express.json());

function isOldEnoughMiddleware(req,res,next){ // MiddleWare 1
    const requestBody = req.body;
    if(requestBody.age && requestBody.age >= 14){
        next(); // This shifts the control from this middleware to next middleware
    }
    else{
        res.status(411).json({
            message:"Sorry you are not of age yet."
        })
    }
}

function rideRedirect(req,res){ // Final Redirecter
    if(req.requestedRide === 1){
        res.redirect('/ride1')
    }
    else if(req.requestedRide === 2){
        res.redirect('/ride2')
    }
    else if(req.requestedRide === 3){
        res.redirect('/ride3')
    }
    else{
        res.status(404).send("Ride not found.")
    }
}

// This is a post request as we are sending data in the body
app.post('/check1',isOldEnoughMiddleware,function(req,res,next){ // This tells that first isOldEnoughMiddleware will be run, then if it shifts to next, only then will this function be exectuted, and finally it is suppose to shift the ride redirect function
    const requestBody = req.body;
    if(requestBody && requestBody.ticket){ // Here, this check acts as a middleware i.e. MiddleWare 2
        req.requestedRide = requestBody.ride;
        next();
    }
    else if(requestBody.ticket==false){
        res.status(403).json({message:"Not allowed to clear check1 due to invalid ticket."})
    }
    else{
        res.status(404).json({message : "Ticket status not found."})
    }
},rideRedirect)

app.get('/ride1',function(req,res){
    res.status(200).send("Ride 1 accessed successfully.")
})

app.get('/ride2',function(req,res){
    res.status(200).send("Ride 2 accessed successfully.")
})

app.get('/ride3',function(req,res){
    res.status(200).send("Ride 3 accessed successfully.")
})


app.listen(port, ()=>{
    console.log(`Listening at port ${port}`)
})