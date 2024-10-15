// Make a database-memory toDo app which performs CRUD on toDos

var express = require('express');
var fs = require('fs');


var app = express();
app.use(express.json())
const filePath = './HTTPS_ToDo_Mini_Project/toDos.json'
const port = 3000

function readToDos() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading toDos file:', err);
    return [];
  }
}

function saveToDos(toDos) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(toDos, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving toDos file:', err);
  }
}


app.get('/', (req, res) => {
  res.send('Hello to your ToDo App.')
})

app.post('/addToDo', (req, res) => {
  const requestBody = req.body; 

  if (requestBody && requestBody.id && requestBody.title) {
    let toDos = readToDos();

    toDos.push({
      id: requestBody.id,
      title: requestBody.title
    });

    saveToDos(toDos);

    res.status(200).json({ message: 'To Do added successfully', toDos });
  } else {
    res.status(400).json({ message: 'Both id and title are required in the request body' });
  }

});

app.put('/updateToDo',(req,res)=>{
  const requestBody = req.body;

  if (requestBody && requestBody.id && requestBody.title) {
    var toDos = readToDos();
    
    const todoIndex = toDos.findIndex(item => item.id === requestBody.id);

    if(todoIndex != -1){
      var toDo = toDos.find(item => item.id === todoIndex + 1);
      toDo.title = requestBody.title
      saveToDos(toDos);

      res.status(200).send("To Do updated successfully")
    }
    else if(todoIndex == -1){
      res.status(404).send("To Do not found")
    }
    else{
      res.status(401).send("Error in updating To Do")
    }
  }

})

app.delete('/deleteToDo',(req,res)=>{
  const requestBody = req.body

  if (requestBody && requestBody.id){
    var toDos = readToDos();
    
    const todoIndex = toDos.findIndex(item => item.id === requestBody.id);

    if(todoIndex != -1){
      toDos.splice(todoIndex, 1);
      saveToDos(toDos);

      res.status(200).send("To Do deleted successfully")
    }
    else if(todoIndex == -1){
      res.status(404).send("To Do not found")
    }
    else{
      res.status(401).send("Error in deleting To Do")
    }
  } 
})

app.get('/viewToDos',(req,res)=>{
  const toDos = readToDos();
  res.json(toDos);
})

app.listen(port, () => {
  console.log(`ToDo app listening on port ${port}`)
})