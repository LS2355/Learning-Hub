import {Learning, Practice, Navbar, Sidebar,Settings} from "./modules"

import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className='m-0 p-0 w-screen h-screen bg-background sm:flex overflow-x-hidden'>
      <Navbar />

      <Sidebar />
      <Routes>
        <Route path="/" element={<Learning />}/>
        <Route path="/practice" element={<Practice />}/>
        <Route path="/settings" element={<Settings />}/>
      </Routes>
    </div>
  )
}

export default App
