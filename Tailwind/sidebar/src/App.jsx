import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar'
import Content from './components/content'

function App() {

  return (
    <div className="flex h-screen w-screen dark:bg-black">
      <Sidebar/> 
      <Content/>
    </div>
  )
}

export default App
