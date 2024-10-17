
async function calculate(){
    const num1 = document.getElementById("input-text-num1").value
    const num2 = document.getElementById("input-text-num2").value

    const operation = document.getElementById("operation-selector").options[[document.getElementById("operation-selector").selectedIndex]].text // Gets all options and from there, chooses the one selected and then gives out it's text (this will also be the route to which we send the request to)

    console.log(`Command to ${operation} on the numbers ${num1} and ${num2}. Command being sent to backend...`)

    const response = await axios.post(`http://localhost:3000/${operation}`,{
        a : num1,
        b : num2
    })
    console.log(`${response.data}`)
    return;
}