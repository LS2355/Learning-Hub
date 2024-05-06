

const searchProblemQuery = (`
      query SearchProblem($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    total: totalNum
    questions: data {
      acRate
      difficulty
      frontendQuestionId: questionFrontendId
      paidOnly: isPaidOnly
      title
      titleSlug
    }
  }
}
`)



export default searchProblemQuery




/* 
this is what the response is going to look like 

{
  "data": {
    "problemsetQuestionList": {
      "total": 296,
      "questions": [
        {
          "acRate": 51.69197774180998,
          "difficulty": "Easy",
          "frontendQuestionId": "1",
          "paidOnly": false,
          "title": "Two Sum",
          "titleSlug": "two-sum"
        },
        {
          "acRate": 67.08444982280231,
          "difficulty": "Medium",
          "frontendQuestionId": "1214",
          "paidOnly": true,
          "title": "Two Sum BSTs",
          "titleSlug": "two-sum-bsts"
        },
        {
          "acRate": 51.50216506659896,
          "difficulty": "Medium",
          "frontendQuestionId": "371",
          "paidOnly": false,
          "title": "Sum of Two Integers",
          "titleSlug": "sum-of-two-integers"
        },
        {
          "acRate": 61.75335138378956,
          "difficulty": "Easy",
          "frontendQuestionId": "1099",
          "paidOnly": true,
          "title": "Two Sum Less Than K",
          "titleSlug": "two-sum-less-than-k"
        },
        {
          "acRate": 37.90738469580602,
          "difficulty": "Easy",
          "frontendQuestionId": "170",
          "paidOnly": true,
          "title": "Two Sum III - Data structure design",
          "titleSlug": "two-sum-iii-data-structure-design"
        }
      ]
    }
  }
}




//how to call it
obj.data.problemsetQuestionList.questions[index].title












*/