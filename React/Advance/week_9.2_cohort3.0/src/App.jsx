import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Basics
// function App() {
//   const [couterVisible,setCounterVisble] = useState(true)

//   useEffect(function(){
//     setInterval(function(){
//       setCounterVisble(c => !c) // Reverse the value every 5 seconds
//     },5000)
//   },[])

//   return (
//     <>
//     {couterVisible && <Counter/>}
//     </>
//   )
  
// }

// // Mounting - When a component is first placed in the DOM
// // Re-Rendering - When a component is updated in the DOM due to state change
// // Mounting - When a component is removed from the DOM
// // Dependency Array - This tells that run the useEffect whenever there is a change in the given variables i.e. this effect DEPENDS on the variable given there


// function Counter(){
//   const [count, setCount] = useState(0)

//   // function IncreaseCount(){
//   //   setCount(count + 1)
//   // }

//   // function DecreaseCount(){
//   //   setCount(count - 1)
//   // }

//   // function ResetCount(){
//   //   setCount(0)
//   // }

//   useEffect(function(){ // This hook basically ensure that the functions inside it run only ONCE the main function is mounted. The empty array here is called the dependency array, which gives the variables which can be used in this useEffect hook
//     const clock = setInterval( // With this hook, setInterval is only called once, after that the setCount function inside is is called every 1 second 
//       function(){
//         setCount(c => c + 1)
//         console.log("clock still running")
//       }, 1000)
//     console.log("mounted")


//     return function(){ // This is how we write the cleanup i.e. what happens when this component unmounts
//       clearInterval(clock)
//     }
//   },[])


//   return (
//     <div className="card">
//       {/* <h1>Count is {count}</h1>
//       <button onClick={()=>IncreaseCount()}>
//         Increase Count 
//       </button>
//       <button onClick={()=>DecreaseCount()}>
//         Decrease Count 
//       </button>
//       <button onClick={()=>ResetCount()}>
//         Reset Count 
//       </button> */}
//       <h3>Count is {count}</h3>
//     </div>
//   )
// }

// Using Props to control state variables from the application than component instance
// function App2() {
//   const [count,setCount] = useState(0)


//   return (
//     <>
//      <Counter2 count={count} setCount={setCount}/>
//     </>
//   )
  
// }

// function Counter2(props){

//   function IncreaseCount(){
//    props.setCount(props.count + 1)
//   }

//   useEffect(function(){
//     console.log("This effect will only happen when there is any change in the count variable")
//   },[props.count])

//   return (
//     <div className="card">
//       <h1>Count is {props.count}</h1>
//       <button onClick={()=>IncreaseCount()}>
//         Increase Count 
//       </button>
//     </div>
//   )
// }

// Children - This basically allows you to pass components or elements as props to other components
function App(){
  const [showTimer,setShowTimer]= useState(0)

  return <div style={{display:"flex"}}>
    <Card child={"Hello DP"}/>
    <Card child={<div>Hello again DP</div>}/>
  </div>
}

function Card({child}){
  return <>
    <span style={{background : 'black', borderRadius : 10, color : 'White',padding : 10,margin : 10}}>
      {child}
    </span>
  </>
}

export default App