export function Practice({ isDemoAccount }) {
  // if(isDemoAccount){display dummy-data else display empty table and save data to local storage}
  //maybe i can just completely regenerate the tr when the value is changed and just have it be set in a function 
  //dont forget to check it you are not doing it rn because we is going to sleep 


  //also gonna need a input form on the bottom that adds to it 
  // function updateTableRow (value,) {
  // }
  const generatedTableData = [];





  function updateProgressColor(e) {

    let value = e.target.value;

    if (value == "done") {
      e.target.className = "text-white bg-green-600";
    } else if (value == "workingOn") {
      e.target.className = "text-white bg-yellow-400";
    } else if (value == "retry") {
      e.target.className = "text-white bg-orange-600";
    } else if (value == "next") {
      e.target.className = "text-white bg-blue-300";
    }
  }

  function buildTableRow() {

    <div>
      <tr className="text-subtext border-t-2 border-b-2 border-borderColor m-0">  {/* remember to delete the bottom border so it dosen't look weird */}
        <td className="px-3 py-1 border-r border-borderColor ">
          <select name="progress" id="0" className="bg-navbar text-white" onChange={(e) => { updateProgressColor(e); }}>
            <option value="placeholder" disabled selected>select progress</option>
            <option value="done">done</option>
            <option value="workingOn">working on</option>
            <option value="retry">retry later</option>
            <option value="next">next</option>
          </select>
        </td> {/* progress */}
        <td className="px-3 py-1 border-l border-r border-borderColor ">640</td>  {/* leetcode number */}
        <td className="px-4 py-1 border-l border-r border-borderColor "><a href="https://youtube.com">hardest problem ever</a></td>  {/* problem title  and link to problem*/}
        <td className="px-3 py-1 border-l border-r border-borderColor ">67%</td>  {/* acceptance % */}
        <td className="px-3 py-1 border-l border-r border-borderColor ">medium</td>  {/* difficulty  / set color of text deppending on difficulty this will be sent on generation */}
        <td className="px-3 py-1 border-l border-borderColor "><input type="text" name="text" className="search-bar" placeholder="........." /></td>  {/* notes */}
      </tr>
    </div>;
  }

  buildTableRow();

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
  );
}
