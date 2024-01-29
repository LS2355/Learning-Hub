import { useEffect, useState, useRef} from "react"
//componets
import { QuestionsPage } from "./questionsPage"
//fake data
import searchProblemQuery from "./graphql/queries"
import fakeLeetCodeData from "../data/table-data"
//api call to leetcode 
import fetchLeetcodeData from "./graphql/fetchData"

export function Practice (Props) {

  const {isDemoAccount, setIsDemoAccount, questionIconClicked, setQuestionIconClicked}= Props



  const [searchbarInput, setSearchbarInput] = useState ("")
  const [problemSearchResults, setProblemSearchResults] = useState([])
  const [tableData, setTableData]= useState()
  const [addFormData, setAddFormData] = useState({
    problemTitle: "",
    progress: "",
    note: ""
  })

  const handleAddFormChange = (event) => {  //call this function whan any of out inputs change ... add to input elements with onChange()
    event.preventDefault();

    const fieldTitle = event.target.getAttribute('searchTitle')
    const fieldvalue = event.target.value

    const newFormData = {...addFormData}
    newFormData[fieldTitle] = fieldvalue

    setAddFormData(newFormData)
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    
  }






  const [generatedTableData, setGeneratedTableData] = useState([])




  
// leetcode fetch api (graphQl)
  //maybe take this out of the useEffect and just make it get called onChange of searchbox
  useEffect(()=>{
    const searchResults = fetchLeetcodeData(searchProblemQuery,searchbarInput)
    setProblemSearchResults(searchResults)
  },[searchbarInput])





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
    
    const progress = document.querySelector("#inputProgress")
    const problem = document.querySelector("#inputSearchedTitle")
    const note = document.querySelector("#inputNote")   

    //i need to pass the object of the selected element from the search results
    let link = "https://apple.com"
    let leetCodeNumber = 8008
    let difficulty = "easy"
    let acceptancePersentage = 69;
    let index = generatedTableData.length + 1


    const tableRow = tableRowDataTemplate(problem.value, link, leetCodeNumber, difficulty, acceptancePersentage, progress.value, note.value, index)

    generatedTableData.push(tableRow)

    console.log("generated data: ", generatedTableData)

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



  const tableRowDataTemplate = ()=>{



    return(
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
  }






  function buildTableRow (dataSet) {
    dataSet.forEach((data, index)=>{
     const {problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note} = data
      const tableRow = tableRowDataTemplate(problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note, index)






    generatedTableData.push(tableRow)
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
                <td colSpan="6" >
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
            {/* {generatedTableData} */}
            {tableData.map((data)=> {
              const {problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note, index} = data
              tableRowDataTemplate(problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note, index)
            })}






          </tbody>
        </table>


        <div className="w-full flex justify-center text-xl italic text-gray-400 mt-6">Select search reasult to properly populate table data </div>




 {/* new table row */}

        <div className="flex flex-wrap w-5/6 mt-6 py-2 border-borderColor">
          <div className="w-2/12 grid place-content-center">
            <select name="progress" id="inputProgress" className="text-white bg-navbar w-11/12 h-full" defaultValue="placeholder" required="required" onChange={(e) =>{selectElementHandler(e); console.log(e)}} > 
              <option value="placeholder" disabled >select progress</option>
              <option value="done">done</option>                                                                             :     
              <option value="workingOn">working on</option>                                                                               
              <option value="retry">retry later</option>
              <option value="next">next</option>
            </select> 
          </div>
          <div className="text-center w-7/12">
            <input name="searchedTitle" id="inputSearchedTitle" placeholder="Search Title" type="text" className="search-bar w-full text-center" required="required" />?
          </div>
          <div className="text-center w-3/12"><input name="note" id="inputNote" placeholder="short note...." type="text" className="search-bar w-11/12 text-center"/></div>
          <div className="w-full mt-4 mr-4">
            <button className="submit-button float-right" onClick={()=>addDataToTable()}>
              <svg className="svgSubmit" viewBox="0 0 16 16">
                <path d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/>
                <path d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708z"/>
              </svg>
            </button>
          </div>
        </div>




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
