const express = require("express")
const app = express()
const cors = require("cors")


app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("welcom to the the server for learning-Hub")
})






async function sendQueryToLeetcode (res, next, query, queryVariables) {
  const url = "https://leetcode.com/graphql"
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({query: query,
      variables: queryVariables
    }),
  })
    const data = await response.json()
    res.json(data)
  return data
}




app.post("/", (req, res, next) => {

  // console.log("body", req.body.query)
  // console.log("variables", req.body.variables)



  const data = sendQueryToLeetcode(res, next, req.body.query, req.body.variables)  

  console.log(data)



})







console.log("🌐⬆")
console.log("server is now live on port 3000")
app.listen(3000)