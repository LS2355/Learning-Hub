import {Learning, Practice, Navbar, Sidebar,} from "./modules"
import { useState } from 'react'

import { Routes, Route } from 'react-router-dom'

//tm plan 
  //make it so data is updated when you press submit 
  //sort practice table (done at bottom, IDK about the rest)
  //connect to localStorage
  //also in localStorage store if was demo was set to true or false (maybe i can use a cookie for this)
  //set up check box for dsa's 
    //if checked move to the bottom part of grid and give them a green border (spotify color)
  // make search reasult box

  //make it so that everthing doesn't rerender each time that search input changes (useRef??????)

  //maybe set up a simple landing page









//bufferign effect https://uiverse.io/JkHuger/ugly-shrimp-50

// hover effect i liked https://uiverse.io/WhiteNervosa/popular-ladybug-27




function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [isDemoAccount, setIsDemoAccount] = useState(true)
  const [questionIconClicked, setQuestionIconClicked] = useState(false)

  return (
    <div className='m-0 p-0 w-screen h-screen bg-background sm:flex overflow-x-hidden'>
      <Navbar />
      <Sidebar 
      setQuestionIconClicked = {setQuestionIconClicked}
      questionIconClicked = {questionIconClicked}
      />
      <Routes>
        <Route path="/" element={
          <Learning 
            questionIconClicked = {questionIconClicked}
            setQuestionIconClicked = {setQuestionIconClicked}
          />
        }/>
        <Route path="/practice" element={
          <Practice 
            isDemoAccount= {isDemoAccount}
            setIsDemoAccount = {setIsDemoAccount}
            questionIconClicked = {questionIconClicked}
            setQuestionIconClicked = {setQuestionIconClicked}
          />
        }/>        
      </Routes>
    </div>
  )
}

export default App
