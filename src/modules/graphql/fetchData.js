
async function fetchLeetcodeData (myQuery, searchbarInput){
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

export default fetchLeetcodeData