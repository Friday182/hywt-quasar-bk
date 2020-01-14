import gql from 'graphql-tag'

export const TASK_QUESTIONS_QUERY = gql`query allTopicMessage($studentId: Int!, $task: String!, $number: Int!){
  allTopicQuestions(studentId: $studentId, task: $task, number: $number) {
    queId
    task
    standardSec
    answerType
    questionType
    questionText
    chartType
    option1
    option2
    option3
    option4
    answer1
    answer2
    answer3
    answer4
    answerText
    helper
    img1
    img2
    tag1
    tag2
    tip
    options
    answers
    tags
    charts
    tables
    clocks
  }
}`

export const ALL_TASK_LOGS_QUERY = gql`query allTaskLogsMessage($userId: Int!, $task: String!){
  allTaskLogs(userId: $userId, task: $task) {
    userId
    userName
    createDate
    taskId
    totalQue
    firstCorrect
    firstWrong
    correctPerc
    totalSec
    totalScore
    avgSec
    avgStdSec
  }
}`

export const TASK_LOGS_QUERY = gql`query taskLogsMessage($userId: Int!, $numLog: Int!){
  taskLogs(userId: $userId, numLog: $numLog) {
    id
    userId
    userName
    createDate
    taskId
    totalQue
    firstCorrect
    firstWrong
    correctPerc
    totalSec
    totalScore
    avgSec
    avgStdSec
  }
}`

export const ALL_STUDENTS_QUERY = gql`query studentsMessage($mentorEmail: String!){
  allStudents(mentorEmail: $mentorEmail) {
    gId
    name
    password
    levels
    membershipActive
    assignment
    expireDate
  }
}`

export const GET_MENTOR_QUERY = gql`query mentorMessage($mentorEmail: String!){
  mentor(mentorEmail: $mentorEmail) {
    gId
    name
    contacts
  }
}`

export const STUDENT_QUERY = gql`query studentMessage($studentId: Int!){
  student(id: $studentId) {
    name
    stickers
    stars
    levels
    assignment
  }
}`

export const STICKERS_QUERY = gql`query studentMessage($studentId: Int!){
  student(id: $studentId) {
    stickers
    stickerLog
  }
}`

export const ALL_DESCRIPTION_QUERY = gql`query taskDescriptionMessage{
  allDescripitions {
    taskId
    title
    description
    example
    note
  }
}`

export const READ_MESSAGE_QUERY = gql`query allMessagesMessage($id: Int!, $msgIdx: Int!){
  allMessages(id:$id, msgIdx: $msgIdx) {
    txId
    rxId
    text
    createDate
    sender
    receiver
  }
}`
