import { stringify } from "postcss"
import fakeLeetCodeData from "../data/table-data"

export function Practice ({isDemoAccount}) {


// if(isDemoAccount){display dummy-data else display empty table and save data to local storage}

//some things to do tommorow

  //make it so that all the table cells are aligned (might have to do fixed with)
  //figure out how to make the color display in the progress element on render
    //might have to make it in a class 
      //something like className= `text-white bg-{progress}` // then the progress variable will be linked to the color since there are only 4 possible options

  //when doing sort options place done list on the bottom 
  




  const generatedTableData = []
  
  

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

  function buildTableRow (dataSet) {
    dataSet.forEach((data, index)=>{
      const {problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note}= data
      console.log(problem, link, leetCodeNumber, difficulty, acceptancePersentage, note)
      


      const tdTemplate =( 
            <tr className="text-subtext border-b-2 border-borderColor m-0" id={`table-row-${index}`} key={`table-row-${index}`}>  {/* remember to delete the bottom border so it dosen't look weird */}
              <td className="w-2/12 px-3 py-1 border-r border-borderColor ">
                <select name="progress" className={handleProgressColor(progress)} defaultValue={progress? progress: "placeholder"} onChange={(e) =>{
                  e.target.className = handleProgressColor(e.target.value);
                   if(!isDemoAccount)updateProgress()
                   }} 
                > 
                  <option value="placeholder" disabled >select progress</option>
                  <option value="done">done</option>                                                                                   
                  <option value="workingOn">working on</option>                                                                               
                  <option value="retry">retry later</option>
                  <option value="next">next</option>
                </select> 
              </td> {/* progress */}
              <td className="w-1/12 px-3 py-1 border-l border-r border-borderColor text-center ">{leetCodeNumber}</td>  {/* leetcode number */}
              <td className="w-4/12 px-4 py-1 border-l border-r border-borderColor text-center">{/* problem title  and link to problem*/}
                <a className="leetcode_link" href={link} target="blank_">{problem}</a>
              </td>  
              <td className="w-1/12 px-3 py-1 border-l border-r border-borderColor text-center ">{acceptancePersentage}</td>  {/* acceptance % */}
              <td className="w-1/12 px-3 py-1 border-l border-r border-borderColor text-center ">{difficulty}</td>  {/* difficulty  / set color of text deppending on difficulty this will be sent on generation */}
              <td className="w-3/12 px-3 py-1 border-l border-borderColor ">{/* notes */}      
                <input type="text" name="text" className="note-box" placeholder="........." value={note}/>
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
    console.log("we will build with either local storage or leetcode api (if i can get one)")
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center my-3">
      <div className="grid place-items-center w-full h-full"> 
        <table className="table-fixed w-5/6">  
          <tbody>
            {generatedTableData}
          </tbody>

          

          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
        </table> 
      </div>
    </div>
  )
}
