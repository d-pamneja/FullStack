var ctr = 1;

function addItem(){
    // Fetch Text
    const text = document.getElementById("input-text");
    if(text.value==""){
        alert("Enter valid input text.");
        return;
    }

    // Update Button
    updateButton = document.createElement("button");
    updateButton.setAttribute("id","updateButton");
    updateButton.setAttribute("onclick","updateItem("+ ctr + ")");
    updateButton.innerHTML = "Update";
    
    // Delete Button
    deleteButton = document.createElement("button");
    deleteButton.setAttribute("id","deleteButton");
    deleteButton.setAttribute("onclick","deleteItem("+ ctr + ")");
    deleteButton.innerHTML = "Delete";

    // Add Item
    const item = document.createElement("p");
    item.setAttribute("class","toDoItem");
    item.setAttribute("id","toDo-"+ctr);
    item.innerHTML = "Task ID " + ctr + " : " + text.value;
    item.append(updateButton);
    item.append(deleteButton);
    ctr = ctr + 1;
    const parent = document.getElementById("title");
    parent.appendChild(item);

    // Reset Value
    text.value = "";
    console.log("Item Added Successfully!");
    return;
}

function deleteItem(index){
    const item = document.getElementById("toDo-"+index);
    item.parentNode.removeChild(item);
    ctr = ctr - 1;
    console.log("Item Deleted Successfully!");
    return;
}

function updateItem(index){
    const item = document.getElementById("toDo-"+index);
    const newTask = prompt("Enter updated task");
    if(newTask!=""){
        const isWhiteSpaceString = newTask.replace(" ","");
        if(isWhiteSpaceString==0){
            alert("Kindly enter a valid task.");
            return;
        }

        // Update Button
        updateButton = document.createElement("button");
        updateButton.setAttribute("id","updateButton");
        updateButton.setAttribute("onclick","updateItem("+ index + ")");
        updateButton.innerHTML = "Update";
        
        // Delete Button
        deleteButton = document.createElement("button");
        deleteButton.setAttribute("id","deleteButton");
        deleteButton.setAttribute("onclick","deleteItem("+ index + ")");
        deleteButton.innerHTML = "Delete";

        item.innerHTML = "Task ID " + index + " : " + newTask;
        item.append(updateButton);
        item.append(deleteButton);

        console.log("Item Updated Successfully!");
    }
    else{
        alert("Kindly enter a valid task.");
        return;
    }
}


