import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// ### What is `useRef`?

// In React, `useRef` is a hook that provides a way to create a **reference** to a value or a DOM element that persists across renders but **does not trigger a re-render** when the value changes.

// ### Key Characteristics of `useRef`:

// 1. **Persistent Across Renders**: The value stored in `useRef` persists between component re-renders. This means the value of a `ref` does not get reset when the component re-renders, unlike regular variables.
// 2. **No Re-Renders on Change**: Changing the value of a `ref` (`ref.current`) does NOT cause a component to re-render. This is different from state (`useState`), which triggers a re-render when updated.

// Use cases 
// 1. Focusing on an input box
// 2. Scroll to bottom
// 3. Clock with start and stop functionality

// function App() {

//   const inputRef = useRef()

//   function focusOnInput(){
//     inputRef.current.focus()
//   }

//   return (
//     <>
//       <div>
//         Login
//         <br></br>
//         <input ref={inputRef} id="name"></input>
//         <br></br>
//         <input id="password"></input>
//         <br></br>
//         <button onClick={focusOnInput}>Submit</button>

//       </div>
//     </>
//   )
// }

// export default App

function App() {

  // // Approach 1 : Clock using useState for timer
  // const [currentTime,setCurrentTime] = useState(0);
  // let clock = 0 // This will only be relevant to this render, as setCurrentTime runs, this will be overidden again and again hence, this would not work in stopping the clock 

  // function startClock(){
  //   clock = setInterval(function (){
  //     setCurrentTime(c => c+1)
  //   },1000)
  // }

  // function stopClock(){
  //   clearInterval(clock)
  // }

  // // Approach 2 :  Clock using useState for timer and it's current value
  // const [currentTime,setCurrentTime] = useState(0);
  // const [timer, setTimer] = useState(0) // Now here the issue that when the setTimer is called, the component immediately re-renders despite it's variable (timer) not showing on the component. So, it does not make sense
  // // have an extra re-render. We just want to store the value which persists across re-renders, and updates the changes

  // function startClock(){
  //   let clock = setInterval(function (){
  //     setCurrentTime(c => c+1)
  //   },1000)
  //   setTimer(clock)
  // }

  // function stopClock(){
  //   clearInterval(timer)
  // }

  // Approach 2 :  Clock using useState for its currentTime and useRef to store the timer itself
  const [currentTime,setCurrentTime] = useState(0);
  const timer = useRef() // Now, this value will persist across re-renders and will not trigger a re-render between updates. A perfect tradeoff between raw variables and useState

  function startClock(){
    let clock = setInterval(function (){
      setCurrentTime(c => c+1)
    },1000)
    timer.current = clock
  }

  function stopClock(){
    clearInterval(timer.current)
  }

  function resetClock(){
    stopClock()
    setCurrentTime(0)
  }



  return (
    <>
      <div>
        StopWatch
        <br></br>
        {currentTime}
        <br></br>
        <button onClick={startClock}>Start Clock</button>
        <br></br>
        <button onClick={stopClock}>Stop Clock</button>
        <br></br>
        <button onClick={resetClock}>Reset Clock</button>
      </div>
    </>
  )
}

export default App
