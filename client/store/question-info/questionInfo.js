import { SET_ANSWER_INFO, ASK_QUESTION, SET_INITIAL_QUESTION_STATE } from '../../constants/action-types/question-answer'

const defaultState = {
  isAsked: false,
  isAnswered: false,
  isUserAnswerCorrect: false
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case SET_ANSWER_INFO: {
      return {
        ...action.payload
      }
    }
    case ASK_QUESTION: {
      return {
        ...state,
        isAsked: true
      }
    }
    case SET_INITIAL_QUESTION_STATE: {
      return {
        ...defaultState
      }
    }
    case 'INIT_STATE': {
      return {
        ...defaultState
      }
    }
    default: {
      return state
    }
  }
}
