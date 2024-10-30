import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
    <Counter/>
    </>
  )
  
}

// Mounting - When a component is first placed in the DOM
// Re-Rendering - When a component is updated in the DOM due to state change
// Mounting - When a component is removed from the DOM

function Counter(){
  const [count, setCount] = useState(0)

  function IncreaseCount(){
    setCount(count + 1)
  }

  function DecreaseCount(){
    setCount(count - 1)
  }

  function ResetCount(){
    setCount(0)
  }

  useEffect(function(){ // This hook basically ensure that the functions inside it run only ONCE the main function is mounted. The empty array here is called the dependency array, which gives the variables which can be used in this useEffect hook
    setInterval(function(){ // With this hook, setInterval is only called once, after that the setCount function inside is is called every 1 second 
      setCount(function(count){
        return count+1;
      })
    }, 1000)
    console.log("mounted")
  },[])


  return (
    <div className="card">
      {/* <h1>Count is {count}</h1>
      <button onClick={()=>IncreaseCount()}>
        Increase Count 
      </button>
      <button onClick={()=>DecreaseCount()}>
        Decrease Count 
      </button>
      <button onClick={()=>ResetCount()}>
        Reset Count 
      </button> */}
      <h3>Count is {count}</h3>
    </div>
  )
}

export default App
