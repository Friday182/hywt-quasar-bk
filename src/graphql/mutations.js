import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
mutation signup($email: String!, $password: String!) {
  createUser(
    email: $email,
    password: $password
  ) {
    user{
      id
      username
      email
    }
  }
}`

export const GET_TOKEN_MUTATION = gql`
mutation getToken($username: String!, $password: String!) {
  tokenAuth(
    username: $username,
    password: $password
  ) {
    token
  }
}`

export const VERIFY_TOKEN_MUTATION = gql`
mutation verifyToken($token: String!) {
  verifyToken(
    token: $token
  ) {
    payload
  }
}`

export const STUDENT_LOGIN_MUTATION = gql`
mutation studentLogin($name: String!, $password: String!) {
  studentLogin(
    name: $name,
    password: $password
  ){
    student {
      gId
      mentorId
      mentorEmail
      name
      age
      city
      country
      school
      stickers
      stars
      membershipActive
      membershipDate
      expireDate
      lastLoginDate
      levels
      assignment
      stickerLog
      contacts
      aiEnabled
    }
    ok
  }
}`

export const ADD_STUDENT_MUTATION = gql`
mutation addStudentMsg($name: String!, $age: Int!, $mentorEmail: String!) {
  addStudent(
    name: $name,
    age: $age,
    mentorEmail: $mentorEmail
  ) {
    student {
      name
    }
    ok
  }
}`

export const DEL_STUDENT_MUTATION = gql`
mutation delStudent($studentId: Int!, $mentorEmail: String!) {
  delStudent(
    studentId: $studentId,
    mentorEmail: $mentorEmail
  ) {
    ok
  }
}`

export const UPDATE_ASSIGNMENT_MUTATION = gql`
mutation updateStudentMsg($studentId: Int!, $assignment: String!) {
  updateStudent(
    id: $studentId,
    assignment: $assignment
  ) {
    ok
  }
}`

export const UPDATE_STICKERS_MUTATION = gql`
mutation updateStudentMsg($studentId: Int!, $stickerNum: Int!, $stickerLog: String!) {
  updateStudent(
    id: $studentId,
    stickers: $stickerNum
    stickerLog: $stickerLog
  ) {
    ok
  }
}`

export const REMOVE_STICKERS_MUTATION = gql`
mutation updateStudentMsg($studentId: Int!, $stickerNum: Int!) {
  updateStudent(
    id: $studentId,
    stickers: $stickerNum
  ) {
    ok
  }
}`

export const ADD_TASKLOG_MUTATION = gql`
mutation addTaskLog($studentId: Int!, $task: String!, $name: String!, $queTotal: Int!, $correctNum: Int!, $usedSeconds: Int!, $totalScore: Int!, $correctPerc: Int!, $stdSec: Int!, $results: String!) {
  addTaskLog(
    userId: $studentId,
    userName: $name
    taskId: $task,
    totalQue: $queTotal,
    firstCorrect: $correctNum,
    totalSec: $usedSeconds,
    totalScore: $totalScore,
    correctPerc: $correctPerc,
    avgStdSec: $stdSec,
    results: $results
  ) {
    ok
    stickers
    stars
  }
}`

export const DEL_LOG_MUTATION = gql`
mutation delLogMsg($logId: Int!) {
  delLog(
    logId: $logId
  ) {
    ok
  }
}`

export const ASSIGNMENT_MUTATION = gql`
mutation setAssignmentMsg($studentId: Int!, $assignment: String!) {
  setAssignment(
    studentId: $studentId,
    assignment: $assignment
  ) {
    ok
  }
}`

export const ADD_MESSAGE_MUTATION = gql`
mutation sendingMsg($txId: Int!, $rxId: Int!, $text: String!, $sender: String!, $receiver: String!) {
  addMessage(
    txId: $txId,
    rxId: $rxId,
    text: $text,
    sender: $sender,
    receiver: $receiver
  ) {
    ok
  }
}`

export const AI_MUTATION = gql`
mutation setAiMsg($studentId: Int!, $aiEnabled: Boolean!) {
  setAiEnabled(
    studentId: $studentId,
    aiEnabled: $aiEnabled
  ) {
    ok
  }
}`

export const ADD_COMMENT_MUTATION = gql`
mutation commentMsg($id: Int!, $text: String!) {
  addComment(
    id: $id,
    text: $text
  ) {
    ok
  }
}`

export const GET_AIREPORT_MUTATION = gql`
mutation aiReportMsg($studentId: Int!) {
  aiReport(
    studentId: $studentId,
  ) {
    ok
    report
  }
}`
