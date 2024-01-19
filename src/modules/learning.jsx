import LearningData from "../data/temp-data";
import { useState } from "react";

export function Learning () {

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
    const {dataStructure, shortDescription, smallImg} = data


    const generatedCard = (
      <div key={index} onClick={()=>{openDSACard(index)}} 
      className=" w-5/6 max-w-72 aspect-square  bg-cardbg sm:w-2/5 sm:max-w-full learningCardBreakpoint:w-64 learningCardBreakpoint:h-64 m-3 p-2 overflow-hidden">
          <h1 className="w-full text-center text-gray-500">{dataStructure}</h1>
          <h3 className="w-full text-center text-subtext">{shortDescription}</h3> {/* try to keep this less then 10 words*/}
          <img src={smallImg} alt={`small image of ${dataStructure}`} />
      </div>
    )

    learningCards.push(generatedCard) //push the card to the learningCards variable so it can show up in the html
  })




  function GenerateDSA () {
    const {dataStructure, shortDescription, diagram, breakdown, videos, resources  }= LearningData[currentActiveCard]
   
    return (
    <div className="w-full h-full grid place-items-center">
     {/* close button */}
      <div onClick={()=>{closeDSACard()}} className="grid place-items-center top-16 left-4 h-8 w-12 rounded-md sm:rounded-full sm:w-12 sm:h-12 bg-hoveredGrey hover:bg-cardbg absolute sm:left-24 sm:top-4 close-button-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="close-button" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>  
      </div>

      <h1 className="pb-10 text-5xl text-white">{dataStructure}</h1>   
      <h2 className="mt-4 mb-10 text-lg text-subtext text-center">{shortDescription}</h2>   
      <img src={diagram} className="mb-16" alt={`diagram of ${dataStructure}`}  />
      <p className="text-center text-md text-subtext px-8">{breakdown}</p>
      <h1 className="text-white text-2xl text-center mt-20 mb-12">CHECK OUT</h1> 
      <div className="w-5/6 flex flex-col lg:flex-row ">
         <iframe  className="w-full lg:w-1/3 mb-8 lg:mx-4" src={videos[0].video} frameBorder="0" allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-store" allowFullScreen title="Youtube video player"></iframe> 
         <iframe  className="w-full lg:w-1/3 mb-8 lg:mx-4" src={videos[1].video} frameBorder="0" allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-store" allowFullScreen title="Youtube video player"></iframe> 
         <iframe  className="w-full lg:w-1/3 mb-8 lg:mx-4" src={videos[2].video} frameBorder="0" allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-store" allowFullScreen title="Youtube video player"></iframe>



      </div>
      <div className="text-left w-5/6">
        <h2 className="text-xl text-white">Resources</h2>
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

{/*<div className="w-5/6 h-4/6 grid place-items-center">
diagram
</div>
<div className="w-5/6 h-2/6 bg-violet-500">
content
</div> */}

  return (
    <div className="flex flex-col w-full h-full justify-center items-center my-3">
      <div className="grid place-items-center w-full h-full"> 
        <div className="flex flex-wrap justify-center w-full h-auto">
          {learningCardOpen == false ? learningCards: <GenerateDSA />}
        </div>

      </div>
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




