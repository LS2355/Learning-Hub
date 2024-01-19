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





  function updateProgressColor (e) {

    let value = e.target.value

    if (value == "done"){
      e.target.className = "text-white bg-green-600"
    }else if(value == "workingOn"){
      e.target.className = "text-white bg-yellow-400"
    }else if(value == "retry"){
      e.target.className = "text-white bg-orange-600"
    }else if(value == "next"){
      e.target.className = "text-white bg-blue-300"
    }
  }

  function buildTableRow (dataSet) {
    dataSet.forEach((data)=>{
      const {problem, link, leetCodeNumber, difficulty, acceptancePersentage, progress, note}= data
      console.log(problem, link, leetCodeNumber, difficulty, acceptancePersentage, note)
      
      
      
      const tdTemplate =( 
        <div>
            <tr className="text-subtext border-t-2 border-b-2 border-borderColor m-0">  {/* remember to delete the bottom border so it dosen't look weird */}
              <td className="px-3 py-1 border-r border-borderColor ">
                <select name="progress" className="bg-navbar text-white" value={progress} onChange={(e) =>{updateProgressColor(e)}} > 
                  <option value="placeholder" disabled selected>select progress</option>
                  <option value="done">done</option>                                                                                   
                  <option value="workingOn">working on</option>                                                                               
                  <option value="retry">retry later</option>
                  <option value="next">next</option>
                </select> 
              </td> {/* progress */}
              <td className="px-3 py-1 border-l border-r border-borderColor ">{leetCodeNumber}</td>  {/* leetcode number */}
              <td className="px-4 py-1 border-l border-r border-borderColor "><a href={link}>{problem}</a></td>  {/* problem title  and link to problem*/}
              <td className="px-3 py-1 border-l border-r border-borderColor ">{acceptancePersentage}</td>  {/* acceptance % */}
              <td className="px-3 py-1 border-l border-r border-borderColor ">{difficulty}</td>  {/* difficulty  / set color of text deppending on difficulty this will be sent on generation */}
              <td className="px-3 py-1 border-l border-borderColor "><input type="text" name="text" className="search-bar" placeholder="........." value={note}/></td>  {/* notes */}            
            </tr>       
      </div>
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
        <table>
          <tbody>
            {generatedTableData}
          </tbody>

          

          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
        </table> 
      </div>
    </div>
  )
}
