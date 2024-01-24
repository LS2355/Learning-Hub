import { useEffect } from "react"
import { useQuery, gql } from "@apollo/client"
import { LOAD_DATA } from "./graphql/queries"

function getleetdata () {
  const {error, loading, data} = useQuery(LOAD_DATA)

useEffect(()=>{
  console.log(data)
},[data])


  return <div></div>
}

export default getleetdata