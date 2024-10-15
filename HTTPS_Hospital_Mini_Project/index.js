const express = require('express');
const port = 3000;


var hospital = express();
hospital.use(express.json())
var idVar = 1;

var kidneys = []

hospital.get('/',function(req,res){
    const totalKidneys = kidneys.length;
    res.status(200).json({message : `The number of kidneys are : ${totalKidneys}.`,kidneys})
})

hospital.post('/newKidney',function(req,res){
    const requestBody = req.body;
    if(requestBody && requestBody.healthStat){
        const newKidneyID = idVar;
        idVar = idVar + 1;
        const newKidneyStats = requestBody.healthStat;

        kidneys.push({
            "id" : newKidneyID,
            "healthStat" : newKidneyStats
        })

        res.status(201).send("New Kidney Added Successfully.")
    } else {
        res.status(400).json({ message: 'Kidney status is required in the request body' });
    }
})

hospital.put('/updateKidney',function(req,res){
    const requestBody = req.body;
    const updateKidneyIndex = kidneys.findIndex(item => item.id === requestBody.id);

    if(updateKidneyIndex != -1){
      var updateKidney = kidneys.find(item => item.id === updateKidneyIndex + 1);
      updateKidney.healthStat = requestBody.healthStat

      res.status(200).send("Kidney status updated successfully")
    }
    else if(updateKidneyIndex == -1){
      res.status(404).send("Kidney not found")
    }
    else{
      res.status(401).send("Error in updating Kidney")
    }
})

hospital.delete('/deleteKidney',function(req,res){
    const requestBody = req.body;
    const deleteKidneyIndex = kidneys.findIndex(item => item.id === requestBody.id);

    if(deleteKidneyIndex != -1){
        kidneys.splice(deleteKidneyIndex, 1);
        res.status(200).send("Kidney deleted successfully")
    }
    else if(deleteKidneyIndex == -1){
        res.status(404).send("Kidney not found")
    }
    else{
        res.status(401).send("Error in updating Kidney")
    }
})

hospital.listen(port, ()=>{
    console.log(`Listening at port ${port}`)
})