import { WebSocketServer } from "ws"

const wss = new WebSocketServer({
    port : 8080
})

wss.on("connection",(socket)=>{ // Whenever connection is called, set a connection with this socket (This is a classic Event Handler)
    console.log("Web Socket Server connected.")
    
    // socket.on("message",(e)=>{
    //     console.log(e.toString())
    //     setInterval(()=>{
    //         socket.send(`Solana Price : $ ${1000 * Math.random()}`)
    //     },5000)
    // })

    // Ping-Pong Application
    socket.on("message",(e)=>{
        if(e.toString()=="ping"){
            socket.send("pong")
        }
    })
})