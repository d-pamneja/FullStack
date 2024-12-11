import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [ws,setWS] = useState()

  const sendMessage = ()=>{
    if(!ws){
      return
    }
    // @ts-ignore
    ws.send("ping")
    console.log("MKA")
  }

  useEffect(()=>{
    const temp = new WebSocket("ws://localhost:8080")
    setWS(temp)


    // @ts-ignore
    ws.onmessage = (e)=>{
      console.log("MKB")
      alert(e.data)
    }
    

  },[])

  return (
    <>
      <div className='flex flex-col place-content-center'>
        <div className='w-full my-10'>
          <input className="border border-slate-800 mx-10 p-3" type="text" placeholder='send message'></input>
          <button className="border border-green-600 rounded p-3" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  )
}

export default App
