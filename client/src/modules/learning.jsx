import LearningData from "../data/learning-data";
import { useState } from "react";
import { QuestionsPage } from "./QuestionsPage";

export function Learning (Props) {

  const {questionIconClicked, setQuestionIconClicked} = Props

  const [learningCardOpen, setLearningCardOpen] = useState(false)
  const [currentActiveCard, setCurrentActiveCard] = useState(null)
  const learningCards = [];

  
    function openDSACard(index) {
      setLearningCardOpen(true)
      setCurrentActiveCard(index)
    }


    function closeDSACard() {
      setLearningCardOpen(false)
      setCurrentActiveCard(null)
    }



    
  LearningData.forEach((data, index)=>{
    const {dataStructure, shortDescription} = data
    
    if (data.type == "section lable"){
      const sectionLable = (
        <div key={index} className="group w-5/6 max-w-72 aspect-square grid place-content-center text-center bg-gray-800 hover:bg-slate-700 sm:w-2/5 sm:max-w-full learningCardBreakpoint:w-64 learningCardBreakpoint:h-64 m-3 p-2 overflow-hidden transition-colors">
          <h2 className="w-full text-white text-4xl">{data.lable}</h2>
          
          <div className="w-full flex justify-center">
            <svg width="45" height="45" fill="white" className="group-hover:scale-110 transition-transform" viewBox="0 0 16 16">
              <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </div>
        </div>
      )
      learningCards.push(sectionLable)
    }
    else{
    const generatedCard = (
      <div key={index} onClick={()=>{openDSACard(index)}} 
      className="w-5/6 max-w-72 aspect-square group bg-cardbg hover:bg-background sm:w-2/5 sm:max-w-full learningCardBreakpoint:w-64 learningCardBreakpoint:h-64 m-3 p-2 overflow-hidden hover:scale-105 transition-all">
        {/* add check box here */}
          <h1 className="w-full text-center text-lg text-gray-500 group-hover:text-sky-600 group-hover:scale transition-colors">{dataStructure}</h1>
          <h3 className="w-full text-center text-subtext group-hover:text-slate-300 transition-colors mt-6">{shortDescription}</h3> {/* try to keep this less then 10 words*/}
      </div>
    )
    learningCards.push(generatedCard) //push the card to the learningCards variable so it can show up in the html
    }
  })




//componets for GenerateDSA
  //this will build the elements for the arrays passed
  function MakeArrayIntoElements (arr, dataStructure){
    const objKey = (Object.keys(arr[0]))[0];
    console.log("objKey", objKey)
    console.log("arr", arr)

    const Arrdata = arr.map((arrObj, indx)=>{
      if (objKey == "pro" || objKey == "con" || objKey == "component" || objKey == "type" || objKey == "trait" || objKey == "step" || objKey == "sub") return (
      <li key={indx} className={objKey == "sub"? "w-full my-1" : "w-4/6 my-1"}>
        {arrObj[objKey]}
        {arrObj.substep ? MakeArrayIntoElements(arrObj.substep) : ""}
        </li>
      )

      if (objKey == "video") return <iframe  className="w-full lg:w-1/3 mb-8 lg:mx-4" src={arrObj[objKey]} frameBorder="0" allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-store" allowFullScreen title="Youtube video player"></iframe> 
      return <p key={indx}>{arrObj[objKey]}</p>
    })
  

    switch (objKey) {
      case "pro":
      case "con":
        return(
          <div className="w-full lg:w-1/2 h-full py-2 px-1 flex flex-wrap justify-center my-10 group">
            <h2 className="w-full text-center text-subtext text-3xl mb-1 h-[60px] group-hover:text-hover-blue transition-colors ease-in duration-500">{objKey+"s"}</h2>
            <ul className="w-full h-full flex flex-wrap justify-center text-white mt-0 list-disc">
              {Arrdata}
            </ul>
          </div>
        )
      case "component":
        return(
          <div className="w-4/5 my-5 group mt-8">
            <h2 className="w-full text-left text-2xl text-subtext group-hover:text-hover-blue transition-colors ease-in duration-500 mb-5">Parts of a {dataStructure}</h2>
            <ul className="w-full text-white flex flex-wrap justify-center list-disc">
              {Arrdata}
            </ul>
          </div>
        )
      case "type":
      case "step":
        return(
          <div className="w-4/5 my-5 mx-auto group mt-12">
            <h2 className="w-full text-left text-2xl text-subtext group-hover:text-hover-blue transition-colors ease-in duration-500 mb-4 capitalize">{objKey}s</h2>
            <ul className="w-full text-white flex flex-wrap justify-center list-decimal">
              {Arrdata}
            </ul>
          </div>
        )
      case "sub":
        return(
          <ul className="list-disc ml-10">
            {Arrdata}
          </ul>
        )

      case "trait":
        return(
          <div className="w-4/5 my-5 mx-auto group mt-12">
            <h2 className="w-full text-left text-2xl text-subtext group-hover:text-hover-blue transition-colors ease-in duration-500 mb-4">How to identify a {dataStructure} problem</h2>
            <ul className="w-full text-white flex flex-wrap justify-center list-disc">
              {Arrdata}
            </ul>
          </div>
        )
      

        case "video":
          return(<>
            <h1 className="text-white text-2xl text-center my-28 mb-20 w-full">CHECK OUT</h1> <br />
            <div className="w-5/6 flex flex-col lg:flex-row justify-center ">
              {Arrdata}
            </div>
            </>
          )
          

      default:
        return (
          <p className="w-4/6"> {Arrdata}</p>
        )
    }
  }



  function GenerateDSA () {
    const {dataStructure, diagram, breakdown, identify, example_snippet, steps, pros, cons, components, types, overview, videos, resources}= LearningData[currentActiveCard]
    return (
    <div className="w-full h-full flex flex-wrap justify-center">
      {/* close button */}
      <div onClick={()=>{closeDSACard()}} className="grid place-items-center top-16 left-4 h-8 w-12 rounded-md sm:rounded-full sm:w-12 sm:h-12 bg-hoveredGrey hover:bg-cardbg sticky sm:left-24 sm:top-4 close-button-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="close-button" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
        {/* start of page */}
      </div>
      <h1 className="pb-10 text-5xl text-white w-full text-center mt-3">{dataStructure}</h1>   
      <p className="w-5/6 text-center text-lg text-white px-8 mt-4">{breakdown}</p>
      <img src={diagram} className="w-11/12 max-w-[1200px] my-24 md:w-4/5" alt={`diagram of ${dataStructure}`}  />
        {/* will attempt to rended if they exist */}
      {identify? MakeArrayIntoElements(identify) : ""}
      {example_snippet? (
          <div className="w-full flex justify-center">
            <div className="w-4/5 max-w-[700px] my-24 rounded-lg overflow-hidden border-navbar border-2 bg-black shadow-md shadow-hover-blue">
              <div className="w-full h-[28px] px-4 bg-subtext flex justify-start font-semibold text-white relative">
                <h1 className="absolute bottom-0 left-4 capitalize">problem example</h1>
              </div>
              <img src={example_snippet} className="w-full p-2" alt={`example of a ${dataStructure}`}/>
            </div>
          </div>
        ) : ""}
      {steps? MakeArrayIntoElements(steps) : ""}
      {types? MakeArrayIntoElements(types) : ""}
      {components? MakeArrayIntoElements(components, dataStructure) : ""}
      {pros? MakeArrayIntoElements(pros) : ""}
      {cons? MakeArrayIntoElements(cons) : ""}
      {overview? <h2 className="w-5/6 text-white text-center text-xl font-bold mt-16">{overview}</h2> : ""}
      {videos? MakeArrayIntoElements(videos) : ""} 

      <div className="text-left w-5/6">
        <h2 className="text-xl text-white mt-10">Resources</h2>
        <ul className="pl-4 mt-8">
          <li className="m-4 text-gray-500">
            <a href={resources[0].link}>{resources[0].title}</a>
          </li>
          {resources[1]? (<li className="m-4 text-gray-500"><a href={resources[0].link}>{resources[0].title}</a></li>): ""}
        </ul>

      </div>
    </div>
    )
  }









  return (
    <div className="flex flex-col w-full h-full justify-center items-center py-3 relative">
      <div className="grid place-items-center w-full h-full"> 
        <h2 className="text-subtext font-semibold text-center">I{String.fromCharCode(39)}m creating these as I learn them. If you have any recommendations let me know through my github or LinkedIn*</h2>
        <div className="flex flex-wrap justify-center w-full h-auto">
          {learningCardOpen == false ? learningCards: <GenerateDSA />}
        </div>

      </div>
      {questionIconClicked? 
        <QuestionsPage 
          currentPage={"learning"}
          setQuestionIconClicked= {setQuestionIconClicked}
        />
        : " "}
    </div>
  )
}

{/* this is the template for displaying the data of the data structures (maybe algor) 
<div className="w-5/6 h-4/6 grid place-items-center">
diagram
</div>
<div className="w-5/6 h-2/6 bg-violet-500">
content
</div> */}




