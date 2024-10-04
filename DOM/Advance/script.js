let toDos = [];
var ctr = 1;

function addItem(){
    if(document.getElementById("input-text").value==""){
        alert("Enter valid input text.");
        return;
    }

    toDos.push(
        {
            id : ctr,
            title : document.getElementById("input-text").value
        }
    )
    ctr = ctr + 1;
    render();
}

function updateItem(index){
    const item = document.getElementById("toDo-"+index);
    const newTask = prompt("Enter updated task");
    if(newTask!="" || newTask!=null){
        const isWhiteSpaceString = newTask.replace(" ","");
        if(isWhiteSpaceString==0){
            alert("Kindly enter a valid task.");
            return;
        }
    }
    else if(newTask==null){
        alert("Kindly enter a valid task.");
        return;
    }
    console.log("Update button in progress");
}

function deleteItem(index){
    var i = toDos.findIndex(toDo => toDo.id == index);
    console.log(i);

    if(i!=-1){
        toDos.splice(i,1);
        ctr = ctr - 1;
        render()
    }
    else{
        console.log("Error in delteing the item")
    }
}

function render(){
    // Reset Previous State
    document.getElementById("title").innerHTML = "";

    // Render Current State
    for(var i=0;i<toDos.length;i++){
        toDo = toDos[i];

        // Update Button
        updateButton = document.createElement("button");
        updateButton.setAttribute("id","updateButton");
        updateButton.setAttribute("onclick","updateItem("+ toDo.id + ")");
        updateButton.innerHTML = "Update";
        
        // Delete Button
        deleteButton = document.createElement("button");
        deleteButton.setAttribute("id","deleteButton");
        deleteButton.setAttribute("onclick","deleteItem("+ toDo.id + ")");
        deleteButton.innerHTML = "Delete";

        // Add Item
        const item = document.createElement("p");
        item.setAttribute("class","toDoItem");
        item.setAttribute("id","toDo-"+toDo.id);
        item.innerHTML = "Task ID " + toDo.id + " : " + toDo.title;
        item.append(updateButton);
        item.append(deleteButton);
        const parent = document.getElementById("title");
        parent.appendChild(item);

        // Reset Value
        document.getElementById("input-text").value = "";
    }
}
