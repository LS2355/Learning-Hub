import {Learning, Practice, Navbar, Sidebar,Settings} from "./modules"

import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [isDemoAccount, setIsDemoAccount] = useState(true)
 
  return (
    <div className='m-0 p-0 w-screen h-screen bg-background sm:flex overflow-x-hidden'>
      <Navbar />

      <Sidebar />
      <Routes>
        <Route path="/" element={<Learning />}/>
        <Route path="/practice" element={
          <Practice 
            isDemoAccount= {isDemoAccount}
          />
        }/>
        <Route path="/settings" element={
          <Settings 
          setIsDemoAccount={setIsDemoAccount}
          />
        }/>
      </Routes>
    </div>
  )
}

export default App
