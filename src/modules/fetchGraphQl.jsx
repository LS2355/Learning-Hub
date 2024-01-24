import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client"
import {ErrorLink, onError} from '@apollo/client/link/error'
import Getleetdata from "./getdata"

export function FetchLeetCodeData () {


  const errorLink = onError(({graphqlErrors, networkError})=>{
    if (graphqlErrors) {
      graphqlErrors.map(({message, location, path})=>{
        alert(`Graphql errer ${message}`)
      })
    }


  })
  const link = from([
    ErrorLink, 
    new HttpLink({uri : "https://leetcode.com/graphql"})
  ])

  const client = new ApolloClient({
    cache: new InMemoryCache,
    link: link
  })

  return ( 
    <ApolloProvider client={client}>
      {" "}
      <Getleetdata/>
    </ApolloProvider>



  )

}