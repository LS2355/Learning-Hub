import questions from "../data/questions"
import { useEffect,useRef } from "react";

export function QuestionsPage (Props){
  const {currentPage, setQuestionIconClicked} = Props

  let questionData;
  if (currentPage == "practice"){
    questionData = questions.practicePageQuestions
  }else if(currentPage == "learning"){
    questionData = questions.learningPageQuestions
  }

  const generatedQuestions = []
  


// window.addEventListener("click", (e)=>{console.log(e.target)})

  useEffect(()=>{
    document.addEventListener("click", handleClickOutside, true)



  }, [])
  const refOne = useRef(null)
  const handleClickOutside = (e) =>{
    if(!refOne.current.contains(e.target)) {
      // clicked outside div
      setQuestionIconClicked(false)
    }
  }




//learn more about useRef
//make it so that Answer is hidden by default then appears on click

  questionData.forEach((questions)=>{
    generatedQuestions.push(
      <div 
        className="m-4 w-full h-fit grid place-content-center rounded-lg p-4 text-center border-borderColor border-2 bg-cardbg">
        <h1 className="text-white">Q: {questions.question}</h1>
        <p className="text-white m-4 text-sm">A: {questions.answer}</p>
      </div>
    )

  })



  return (
    <div className="absolute w-full h-full bg-background/75">
      <div className="absolute w-5/6 h-5/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden" ref={refOne}>
        <div className="flex flex-wrap w-full h-full p-3 overflow-scroll bg-questionPageBG border-2 border-navbar rounded-md">
          {generatedQuestions}
        </div>
      </div>
    </div> 
  )
}
