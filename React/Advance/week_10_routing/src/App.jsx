import { useState } from 'react'
import {BrowserRouter,Routes,Route,Link,useNavigate, redirect, Outlet} from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // So here, we use "BrowserRouter" to initiate the routing system in app, then we use "Routes" to define all the routes, inside which each route comes as a "Route" object
  // Also, we can use "Link" object or "useNavigate" hook to handle moving to other routes without reloading the entire page. 
  // Link can be used then the user wants to mannually move to another route 
  // useNavigate can be used when the website wants to send to a particular route (although can even be user induced)

  // Also, we can use Outler, to wrap all child routes inside a parent route. That is, by default it does render the parent route and then heads into the 
  // child route direction. If no valid route found, then it goes to render the parent route. Also, the parent route ensures that all route below it maintain consitency. 
  // In a way, we can have multiple layouts for multiple type of pages and can restrict using the following
   
  return (
    <>
      <div>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout/>}>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/neet/class10" element={<Class10/>}/>
                <Route path="/neet/class11" element={<Class11/>}/>
                <Route path="/neet/class12" element={<Class12/>}/>
                <Route path="*" element={<InvalidPage/>}/>
              </Route>
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

function Layout(){ // This basically defines the layout of how the page would be i.e. it would have certain fixed components and then all children which render as per route
  return (
    <>   
      <Header/>
      <div id="page-content" style={{height : "80vh"}}>
        <Outlet/>
      </div>
      <Footer/>
    </>

  )
}

function Header(){
  return (
    <>
      <div id="header" style={{height : "10vh"}}>
        <Link to="/">Home</Link> | <Link to="/neet/class10">Class 10</Link> | <Link to="/neet/class11">Class 11</Link> | <Link to="/neet/class12">Class 12</Link> 
      </div>
    </>
  )
}

function Footer(){
  return (
    <>
      <div id="footer" style={{height : "10vh"}}>
        Footer
      </div>
    </>
  )
}

function LandingPage(){
  return (
    <div>
      Hi, welcome to coaching center
    </div>
  )
}

function Class10(){
  const naviagte = useNavigate()

  function redirectHome(){
    naviagte("/")
  }

  return (
    <div>
      This is the page for class 10 online coaching
      <br></br><br></br>
      <button onClick={redirectHome}>Go Back</button>
    </div>
  )
}

function Class11(){
  const naviagte = useNavigate()

  function redirectHome(){
    naviagte("/")
  }

  return (
    <div>
      This is the page for class 11 online coaching
      <br></br><br></br>
      <button onClick={redirectHome}>Go Back</button>
    </div>
  )
}

function Class12(){
  const naviagte = useNavigate()

  function redirectHome(){
    naviagte("/")
  }

  return (
    <div>
      This is the page for class 12 online coaching
      <br></br><br></br>
      <button onClick={redirectHome}>Go Back</button>
    </div>
  )
}

function InvalidPage(){
  const naviagte = useNavigate()

  function redirectHome(){
    naviagte("/")
  }

  return (
    <div>
      Oops! Page not found.
      <br></br><br></br>
      <button onClick={redirectHome}>Go Back</button>
    </div>
  )
}

export default App
