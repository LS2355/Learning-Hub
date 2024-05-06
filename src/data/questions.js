const practicePageQuestions = [
  {
    question: "why cant i auto fill the table with my leetcode.",
    answer: "i can get a lot of data from the leetcode graphql server,but when it comes to submissions i can only get the last 20 submitted. to get a list of all submistions its a diffrent type of server (rest) but i dont know what i have to send for authentication if anyone knows please shoot me an email so i can add that feature(i want it to). and the api link for submissions is https://leetcode.com/api/submissions/"
  },
  {
    question: "Why can't I make a account to access my information everywhere",
    answer: "I could add personal accounts, but the main consern I have are data breaches. so for both of our saftey I'd rather stay away from that. although if alot of people want that feature ill probably add it"
  },
  {
    question: "how is my info / data used",
    answer: "it's only used for the table i don't share or store anything. I don't want your information for both of our saftey"
  },
  {
    question: "how is the rest of the data filled out",
    answer: "all the data comes from the leetcode api. all i need is the question you are searching for then i can send a post request (because they use graphQl api) for it, and for the link its pretty simple since all of leetcodes problems are linked to their baseUrl+/'problemName'"
  }
]

const learningPageQuestions = [
  {
    question: "have questions?",
    answer: "please send them through the git repo"
  }

]

export default {
  practicePageQuestions,
  learningPageQuestions
}