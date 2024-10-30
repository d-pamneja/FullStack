import React,{useState,useEffect } from 'react'
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
// function App(){
//   const [showTimer,setShowTimer]= useState(0)

//   return <div style={{display : 'flex',color : 'black'}}>
//     <Card child={"Hello DP"}/>
//     <Card child={<h4 style={{color : 'black'}}><b>Hola Amigo</b></h4>}/>
//     <Card child={<p style={{color : 'black'}}>Kaise ho, theek ho?</p>}/>

//     <Card>
//       This is the best way to store a particular content as a child of the card tag
//     </Card>
//   </div>
// }

// function Card({child}){
//   return <>
//     <div style={{
//       border : '1px solid #ccc',
//       borderRadius : '5px', 
//       color : 'White',
//       padding : '20px',
//       margin : '10px',
//       boxShadow : '2px 2px 5px rgba(0,0,0,0.1)'
//     }}>
//       {child}
//     </div>
//   </>
// }

// Lists and Keys - In this way, you can create a list and map it's components to a uniuqe/custom component. Note that in that case, 
// each component must have their own unique identifier. That unique identifier has to be passed as a key
function App(){
  const todos = [
    {
      "id" : 1,
      "title" : "go to gym",
      "done" : true
    },
    {
      "id" : 2,
      "title" : "each lunch",
      "done" : false
    }
  ]

  
  const toDoComponents = todos.map(todo => <ToDo key={todo.id} title={todo.title} done={todo.done}></ToDo>)

  return( // Error Boundary protects the speical card component
      <div>
        {toDoComponents}
        <ErrorBoundary> 
            <CardSpeacial/>
        </ErrorBoundary>
    </div>
  )
}
// These are called inline styling, when you provide the style inside the div
function ToDo({title,done}){
  return(
    <div style={{marginBottom:'10px', color : 'white', backgroundColor : 'black', border : '1px solid #ccc', borderRadius : '15px'}}>  
      {title} - {done ? "Done" : "Not Done!"}
    </div>
  )
}

// Error Boundary - Very Useful method of containing an error. If any particular component does not work or throws an error, usually the entire website comes crashing down
// Instead, we can use error boundaries to contain that error so that the particular component at fault only goes down or shows error, rest website is still running
// Error boundaries are React components that catch JavaScript errors in their child component tree and display a fallback UI.
// This can only be done via class components (legacy)

class ErrorBoundary extends React.Component {
  constructor(props) {
      super(props);
      this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
      return { hasError: true };
  }

  componentDidCatch(error, info) {
      console.error("Error caught:", error, info);
  }

  render() {
      if (this.state.hasError) {
          return <h1>Something went wrong.</h1>;
      }
      return this.props.children; 
  }
}

function CardSpeacial(){
    throw new Error("Sorry I crashed.")
    return(
      <div style={{background : "red", borderRadius : 20,padding : 50}}>
        hello
      </div>
    )
}

export default App