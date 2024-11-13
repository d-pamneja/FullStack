import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar'

function App() {

  return (
    <div className="h-screen w-screen dark:bg-black">
      <Sidebar/> 
    </div>
  )
}

export default App
