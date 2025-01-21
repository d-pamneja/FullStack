import { useEffect, useState,useRef } from 'react'
import './App.css'

function App() {
  const [ws,setWS] = useState<WebSocket | null>(null)
  const inputRef = useRef();

  
  function sendMessage(){
    //@ts-ignore
    const message = inputRef.current.value;
    ws?.send(message);
  }


  useEffect(()=>{
    const temp = new WebSocket('ws://localhost:8080');
    setWS(temp)

    temp.onmessage = (ev) => {
      alert(ev.data)
    }

  },[])

  return (
    <>
      <div className='flex flex-col place-content-center'>
        <div className='w-full my-10'>
          <input ref={inputRef} className="border border-slate-800 mx-10 p-3" type="text" placeholder='send message'></input>
          <button className="border border-green-600 rounded p-3" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  )
}

export default App
