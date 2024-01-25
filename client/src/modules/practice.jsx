import { useEffect, useState } from "react"

import { QuestionsPage } from "./questionsPage"

import searchProblemQuery from "./graphql/queries"
import fakeLeetCodeData from "../data/table-data"

export function Practice (Props) {

  const {isDemoAccount, setIsDemoAccount, questionIconClicked, setQuestionIconClicked}= Props

  const [newProblemStatus, setNewProblemStatus] = useState("")
  const [newProblemQuestion, setNewProblemQuestion] = useState("")
  const [newProblemNote, setNewProblemNote] = useState("")

  const [searchbarInput, setSearchbarInput] = useState ("")
  const [problemSearchResults, setProblemSearchResults] = useState([])



// if(isDemoAccount){display dummy-data else display empty table and save data to local storage}


  
// leetcode fetch api (graphQl)

  useEffect(()=>{
    const searchResults = fetchLeetcodeData(searchProblemQuery)
    setProblemSearchResults(searchResults)
  },[searchbarInput])

  async function fetchLeetcodeData (myQuery){
    const backendServerUrl = "http://localhost:3000/"
    const result = await fetch(backendServerUrl,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({query: myQuery,
        variables: {
          categorySlug : "all-code-essentials",
          skip: 0,
          limit: 5,
          filters: {
            searchKeywords: searchbarInput
          }
        }      
      })

   })
    
    const data = await result.json()

    return data.data.problemsetQuestionList.questions
  }






  const generatedTableData = []
  //i know this is inefficent but i cant figure it out right now. i'm gonna come back to it but for now this shit is pissing me off.
  // i need to figure out a way to do this in the lower forEach loop without getting a "to many re-renders" error
  // but still technicaly O(n) time, just actually O(2n)
  const [problemsCompleted, setProblemsCompleted]= useState(()=>{
    let count = 0
    for(let i in fakeLeetCodeData){
      if(fakeLeetCodeData[i].progress == "done"){
        count++
      }
    }
    return count
  })
  
  

// tailwind weird and i can only get the select box colors to generate like this (for the initial load)
  function handleProgressColor (enteredValue) {
    console.log(enteredValue)
    if (enteredValue == "done"){
      return "text-white bg-done w-full"
    }
    else if (enteredValue == "workingOn"){
      return "text-white bg-workingOn w-full"
    }
    else if (enteredValue == "retry"){
      return "text-white bg-retry w-full"
    }
    else if (enteredValue == "next") {
      return "text-white bg-next w-full"
    }  
    else {
      return "text-white bg-navbar w-full"
    }
  }


  function updateProgress(e){
    console.log("updated")
    /* here we are going to update local storage with problems progress change */
  }


  function selectElementHandler (e) {
    e.target.className = handleProgressColor(e.target.value);
    if(!isDemoAccount)updateProgress()
    if(e.target.value== "done"){
      setProblemsCompleted((prev)=>prev + 1)
    }else{
      setProblemsCompleted((prev)=>prev - 1)
    }
  }


  function addDataToTable(){
    console.log("dataAdded")
  }


  function difficultyColor(difficulty){
    if(difficulty == "easy"){
      return "w-1/12 px-3 py-1 border-l border-r border-borderColor text-center text-green-600 font-extralight"
    }else if(difficulty == "medium"){
      return "w-1/12 px-3 py-1 border-l border-r border-borderColor text-center text-yellow-600 font-extralight"
    }else if(difficulty == "hard"){
      return "w-1/12 px-3 py-1 border-l border-r border-borderColor text-center text-red-600 font-extralight"
    }else{
      return "w-1/12 px-3 py-1 border-l border-r border-borderColor text-center font-extralight"
    }

  }


  function buildTableRow (dataSet) {
    dataSet.forEach((data, index)=>{
      const {problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note}= data

      const tdTemplate =( 
            <tr className="text-subtext border-b-2 border-borderColor m-0" id={`table-row-${index}`} key={`table-row-${index}`}>  {/* remember to delete the bottom border so it dosen't look weird */}
              <td className="w-2/12 px-3 py-1 border-r border-borderColor ">
                <select name="progress" className={handleProgressColor(progress)} defaultValue={progress? progress: "placeholder"} onChange={(e) =>{selectElementHandler(e)}} > 
                  <option value="placeholder" disabled >select progress</option>
                  <option value="done">done</option>                                                                                   
                  <option value="workingOn">working on</option>                                                                               
                  <option value="retry">retry later</option>
                  <option value="next">next</option>
                </select> 
              </td> {/* progress */}
              <td className="w-1/12 px-3 py-1 border-l border-r border-borderColor text-center ">{leetCodeNumber}</td>  {/* leetcode number */}
              <td className="w-4/12 px-4 py-1 border-l border-r border-borderColor text-center text-brighterSubtext">{/* problem title  and link to problem*/}
                <a className="leetcode_link" href={link} target="blank_">{problem}</a>
              </td>  
              <td className="w-1/12 px-3 py-1 border-l border-r border-borderColor text-center ">{acceptancePersentage}</td>  {/* acceptance % */}
              <td className={difficultyColor(difficulty)}>{difficulty}</td>  {/* difficulty  / set color of text deppending on difficulty this will be sent on generation */}
              <td className="w-3/12 px-3 py-1 border-l border-borderColor ">{/* notes */}      
                <input type="text" name="text" className="note-box w-full" placeholder="..." value={note}/>
                </td>        
            </tr>       
      )
    generatedTableData.push(tdTemplate)
    })
  } 

  

  //if we are using a demo account use fake data else use real data
  if (isDemoAccount){
    buildTableRow(fakeLeetCodeData)
  }else{
    setProblemsCompleted(0)
    //this will cause a to many renders error i know i can use a useEffect and useref here
    buildTableRow()
     
    
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center py-3 relative">
      <div className="grid place-items-center w-full h-full"> 
        <div className="w-full flex justify-center md:justify-end">
          <button className={`demo-button absolute top-6 sm:right-6 sm:m-auto ${!isDemoAccount ? " demo-button_live": ""}`} onClick={()=>setIsDemoAccount(!isDemoAccount)}>
            {isDemoAccount? "demo": "live"}
          </button>
        </div>
        <table className="w-5/6 mt-24"> 
          <thead >
            <tr className="text-right text-gray-500">
                <td colSpan="6">
                  ✅ {problemsCompleted}
                </td>
              </tr>
            <tr className="text-center border-b-2 border-borderColor text-white uppercase">
              <td>status</td>  
              <td>#</td>
              <td>Problem</td>
              <td>acceptance</td>
              <td>difficulty</td>
              <td>quick note</td>
            </tr>  
          </thead> 
          <tbody className="mb-2">
            {generatedTableData}
          </tbody>
        </table>
 {/* new table row */}
        <div className="flex w-5/6 mt-6 py-2 border-borderColor">
          <div className="w-3/12 grid place-content-center">
            <select name="progress" className="text-white bg-navbar w-11/12 h-full" defaultValue="placeholder" onChange={(e) =>{selectElementHandler(e)}} > 
              <option value="placeholder" disabled >select progress</option>
              <option value="done">done</option>                                                                                   
              <option value="workingOn">working on</option>                                                                               
              <option value="retry">retry later</option>
              <option value="next">next</option>
            </select> 
          </div>
          <div className="text-center w-6/12">
            <input placeholder="Search Title" type="text" className="search-bar w-full text-center" required="" onChange={(e)=>setSearchbarInput(e.target.value)}/>
          </div>
          <div className="text-center w-3/12"><input placeholder="short note...." type="text" className="search-bar w-11/12 text-center" required=""/></div>
        </div>
        <button className="submit-button" onClick={()=>addDataToTable()}>
          <div  className="submit-href"><span>submit</span></div> 
        </button>




      {questionIconClicked? 
        <QuestionsPage 
          currentPage={"practice"}
          setQuestionIconClicked= {setQuestionIconClicked}
        />
        : " "}
    </div>
    </div>
  )
}
