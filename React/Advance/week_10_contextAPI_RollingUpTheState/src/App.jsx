import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// As your application grows, you might find that multiple components need access to the same state. 
// Instead of duplicating state in each component, you can lift the state up to the LCA, allowing the common ancestor to manage it. Pretty ammature approach, 
// a better way would be state management. This is not optimal as this creates a lot of re-renders

function App() {

  return (
    <>
      <div>
       <LightBulb/>
      </div>
    </>
  )
}

function LightBulb(){
  const [bulb, toggleBulb] = useState(true) // Here, we can see how we have stored the state variables in the least common ancestor of both "BulbState"
  // and "ToggleBulb". Now, we can ideally also store this up the chain, but the ideal way is to store it at the least common ancestor, as that is what is required.

  return(
    <>
      <BulbState bulb={bulb}/>
      <br></br>
      <br></br>
      <ToggleBulb bulb={bulb} toggleBulb={toggleBulb}/>
    </>
  )
}

function BulbState(props){
  return(
    <>
      {props.bulb ? "Bulb On" : "Bulb Off"}
    </>
  )
}

function ToggleBulb(props){
  function toggle(){
    props.toggleBulb(currentState => !currentState)
  }

  return(
    <>
      <button onClick={toggle}>Toggle the Bulb</button>
    </>
  )
}


// Prop drilling
// Prop drilling occurs when you need to pass data from a higher-level component down to a lower-level component that is several layers deep in the component tree. This often leads to the following issues:
// Complexity: You may have to pass props through many intermediate components that don’t use the props themselves, just to get them to the component that needs them.
// Maintenance: It can make the code harder to maintain, as changes in the props structure require updates in multiple components.

export default App
