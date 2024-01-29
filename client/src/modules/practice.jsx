import { useEffect, useState, useRef} from "react"
//componets
import { QuestionsPage } from "./questionsPage"
//fake data
import searchProblemQuery from "./graphql/queries"
import fakeLeetCodeData from "../data/table-data"
//api call to leetcode 
import fetchLeetcodeData from "./graphql/fetchData"



export function Practice (Props){
//props
  const {questionIconClicked, setQuestionIconClicked} = Props

//useState variables
  //demoAccount
  const [isDemoAccount, setIsDemoAccount] = useState(true)
  //form
  const [tableData, setTableData] = useState(fakeLeetCodeData)
  const [addFormData, setAddFormData] = useState({
    problem: "",
    progress: "",
    link: "",
    leetCodeNumber: "",
    difficulty: "",
    acceptancePersentage: "",
    note: "",
    index: ""

  })
  //problems
  const [problemSearchResults, setProblemSearchResults] = useState([])
  const [searchbarInput, setSearchbarInput] = useState("")
  const [problemsCompleted, setProblemsCompleted]= useState(()=>{
    let count = 0
    for(let i in tableData){
      if(tableData[i].progress == "done"){
        count++
      }
    }
    return count
  })



  //form 
  const handleAddFormChange = (event) => {  //call this function whan any of out inputs change ... add to input elements with onChange()
    event.preventDefault();

    const fieldName = event.target.getAttribute('name')
    const fieldvalue = event.target.value


    const newFormData = {...addFormData}
    newFormData[fieldName] = fieldvalue

    setAddFormData(newFormData)
  }


  const handleAddFormSubmit = (event) => {
    event.preventDefault()
    
    const newTableRow = {
    problem: addFormData.problem,
    progress: addFormData.progress,
    link: addFormData.link,
    leetCodeNumber: addFormData.leetCodeNumber, 
    difficulty: addFormData.difficulty,
    acceptancePersentage: addFormData.acceptancePersentage,
    note: addFormData.note,
    // index: addFormData.index
    }
    const newTableRows = [...tableData, newTableRow]

    setTableData(newTableRows)
  }
  //form style
  function handleProgressColor (enteredValue){
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

  // handles Progress (select) element
  function handleProgressElement (e) {
    e.target.className = handleProgressColor(e.target.value);
    if(!isDemoAccount) console.log("update local storage with new progress status") //dont forget to update this
    if(e.target.value== "done"){
      setProblemsCompleted((prev)=>prev + 1)
    }else{
      setProblemsCompleted((prev)=>prev - 1)
    }
  }



  //sorting the table 
    function tableSort () {
      // in this function we will sort the data so that the objects with progress: "done" will be at the bottom of the list
    }



  const tableRowDataTemplate = (problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note, index)=>{

    return(
            <tr className="text-subtext border-b-2 border-borderColor m-0" id={`table-row-${index}`} key={`table-row-${index}`}>  {/* remember to delete the bottom border so it dosen't look weird */}
              <td className="w-2/12 px-3 py-1 border-r border-borderColor ">
                <select name="progress" className={handleProgressColor(progress)} defaultValue={progress? progress: "placeholder"} onChange={(e) =>{handleProgressElement(e)}} > 
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


    //leetcode fetch api (graphQl)
    //i know this is inefficent but i cant figure it out right now. i'm gonna come back to it but for now this shit is pissing me off.
    // i need to figure out a way to do this in the lower forEach loop without getting a "to many re-renders" error
    // but still technicaly O(n) time, just actually O(2n)seEffect(()=>{
      useEffect(()=>{
    const searchResults = fetchLeetcodeData(searchProblemQuery,searchbarInput)
    setProblemSearchResults(searchResults)
  },[searchbarInput])








return(
  <div className="flex flex-col w-full h-full justify-center items-center py-3 relative">
    <div className="grid place-items-center w-full h-full"> 

    {/* demo/live button */}
      <div className="w-full flex justify-center md:justify-end">
        <button className={`demo-button absolute top-6 sm:right-6 sm:m-auto ${!isDemoAccount ? " demo-button_live": ""}`} onClick={()=>setIsDemoAccount(!isDemoAccount)}>
          {isDemoAccount? "demo": "live"}
        </button>
      </div>
    {/* demo/live button */}

    {/* leetcode table*/}
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
          {tableData.map((data, index)=> {
            const {problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note} = data
            return tableRowDataTemplate(problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note, index)
          })}
        </tbody>
      </table>
      {/* leetcode table */}

      <div className="w-full flex justify-center text-xl italic text-gray-400 mt-6">Select search reasult to properly populate table data </div>
      
      {/* input form */}
      <form className="flex flex-wrap w-5/6 mt-6 py-2 border-borderColor" onSubmit={handleAddFormSubmit}>
        {/* progress input */}
        <div className="w-2/12 grid place-content-center">
          <select name="progress" className="text-white bg-navbar w-11/12 h-full" defaultValue="placeholder" required="required" onChange={(e) => {handleProgressElement(e); handleAddFormChange(e)}} > 
            <option value="placeholder" disabled >select progress</option>
            <option value="done">done</option>                                                                             :     
            <option value="workingOn">working on</option>                                                                               
            <option value="retry">retry later</option>
            <option value="next">next</option>
          </select> 
        </div>
        {/* progress input */}

        {/* title Input */}
        <div className="text-center w-7/12">
          <input name="problem" placeholder="Search Title" type="text" className="search-bar w-full text-center" required="required" onChange={handleAddFormChange}/>?
        </div>
        {/* title Input */}
        
        {/* note Input */}
        <div className="text-center w-3/12">
          <input name="note" id="inputNote" placeholder="short note...." type="text" className="search-bar w-11/12 text-center" onChange={handleAddFormChange}/>
        </div>
        {/* note Input */}

        {/* submit button */}
        <div className="w-full mt-4 mr-4">
          <button className="submit-button float-right" type="submit">
            <svg className="svgSubmit" viewBox="0 0 16 16">
              <path d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/>
              <path d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708z"/>
            </svg>
          </button>
        </div>
        {/* submit button */}
      </form>
      {/* input form */}
  

      {/* if question icon is clicked then diplay questions */}
      {questionIconClicked ? 
        <QuestionsPage 
          currentPage={"practice"}
          setQuestionIconClicked= {setQuestionIconClicked}
        />
        : " "}
  
  
    </div>
  </div>
)
}