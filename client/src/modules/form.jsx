import { useState, useEffect } from "react"
import fetchLeetcodeData from "./graphql/fetchData"
import searchProblemQuery from "./graphql/queries"
import {nanoid} from "nanoid"

export function InputForm (Props) {
  const {tableData, setTableData, tableSort, handleProgressElement}= Props
  const [searchbarInput, setSearchbarInput] = useState("")
  const [searchResults, setSearchResults] = useState([{title: "data1",extra:"jdlfksjdlkfjsd"},{title: "data2"},{title: "data3"}, {title: "data5"}])
  const [searchResultSelected, setSearchResultSelected] = useState(false)
  const [error, setError] = useState(false)
  
  
    //leetcode fetch api (graphQl)
    //i know this is inefficent but i cant figure it out right now. i'm gonna come back to it but for now this shit is pissing me off.
    // i need to figure out a way to do this in the lower forEach loop without getting a "to many re-renders" error
    // but still technicaly O(n) time, just actually O(2n)seEffect(()=>{
      useEffect(()=>{
        (async function () {
          const response = await fetchLeetcodeData(searchProblemQuery,searchbarInput)
          setSearchResults(response)
        })()
        
      },[searchbarInput])

    //remake this page so that its just the search results nb

    
  const [addFormData, setAddFormData] = useState({
    progress: "",
    note: ""
  })


    
  const handleAddFormChange = (event) => {  //call this function whan any of out inputs change ... add to input elements with onChange() creates objs for rows
    event.preventDefault();
    const fieldName = event.target.getAttribute('name')
    const fieldvalue = event.target.value

    const newFormData = {...addFormData}
    newFormData[fieldName] = fieldvalue

    setAddFormData(newFormData)
  }



  const handleAddFormSubmit = (event) => {
    event.preventDefault()

    if(searchResultSelected == false){
      console.error("problem not selected");
      setError("please select option")
      return
    }



    let {acRate, difficulty, frontendQuestionId, title, titleSlug}=searchResultSelected
    difficulty = difficulty.toLowerCase()
    acRate = Math.floor(acRate) //get rid of decimal

    const newTableRow = {
      problem: title,
      progress: addFormData.progress,
      link: titleSlug,
      leetCodeNumber: frontendQuestionId, 
      difficulty: difficulty,
      acceptancePersentage: acRate,
      note: addFormData.note,
      id: nanoid()
    }
    let TableRowsArray
    if(tableData){
      TableRowsArray = [...tableData, newTableRow]
    }else{
      TableRowsArray = [newTableRow]
    }
    const newTableRows = tableSort(TableRowsArray)

    setTableData(newTableRows)
    setSearchResultSelected(false);
  }
  
  

  

  const handleSearchbar = (e) =>{
    handleAddFormChange(e)  //im going to have to add this to after the right result gets clicked
    setSearchbarInput(e.target.value)
    if(error != false){
      setError(false)
    }

  }



  return (       
    <>
      <form className="flex flex-wrap w-5/6 mt-6 py-2 border-borderColor" onSubmit={(e)=>{handleAddFormSubmit(e); setSearchbarInput("")}}>
      {/* progress input */}
      <div className="w-2/12 grid place-content-center">
        <select name="progress" className="text-white bg-navbar w-11/12 h-full" defaultValue="placeholder" required="required" onChange={(e) => {handleProgressElement(e, null); handleAddFormChange(e)}} > 
          <option value="placeholder" disabled >select progress</option>
          <option value="done">done</option>                                                                             :     
          <option value="workingOn">working on</option>                                                                               
          <option value="retry">retry later</option>
          <option value="next">next</option>
        </select> 
      </div>
      {/* progress input */}

      {/* title Input / search */}

          <div className="text-center w-7/12 flex flex-wrap justify-center">
        <input value={searchbarInput} name="problem" placeholder="Search Title" type="text" className="search-bar w-full text-center" required="required" autoComplete="off" onChange={(e)=>{handleSearchbar(e)}}/>
        <br />

    </div>
      {/* note Input */}
      <div className="text-center w-3/12">
        <input name="note" id="inputNote" placeholder="short note...." type="text" className="search-bar w-11/12 text-center" autoComplete="off" onChange={handleAddFormChange}/>
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
      <div className="w-5/6 flex"> {/*containers so that the autofill section */}
        <div className="w-2/12"> </div>
        <div className="w-7/12 flex justify-center ">
        <div className="bg-navbar w-8/12 mt-1 text-white">
           {error ? (
             <p className="w-full h-full text-center text-white py-2 bg-red-700 ">{error}</p>
             ) : (
               <ul>
            {searchResults ? (searchResults.map((data) => (
              <li key={nanoid()} onClick={()=>{setSearchResultSelected(data); setSearchbarInput(data.title) }} className="w-full h-full text-center text-neutral-500 py-2 hover:bg-gray-700 visited.:bg-pink-300 hover:text-white transition-all">{data.title}</li>
              ))):""}  
          </ul>
          )}
        </div>
        </div>
      </div>
    </>




  )
}     