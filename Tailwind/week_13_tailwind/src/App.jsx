import './App.css'
import { nav } from './structure/navigation'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <div className="bg-blue-700 h-screen w-screen">
      <BrowserRouter>
        <Routes>
          {nav.map((r,i)=>{
            return <Route key = {i} path = {r.path} element = {r.element}/>
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
