import { SET_ANSWER_INFO, ASK_QUESTION, SET_INITIAL_QUESTION_STATE } from '../constants/action-types/question-answer'

export function setAnswerInfo(answerInfo) {
  return {
    type: SET_ANSWER_INFO,
    payload: answerInfo
  }
}

export function askQuestion() {
  return {
    type: ASK_QUESTION
  }
}

export function setInitialQuestionState() {
  return {
    type: SET_INITIAL_QUESTION_STATE
  }
}