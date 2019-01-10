import {
  END_ROUND,
  START_ROUND,
  START_INITTING_GAME,
  SET_LEVEL,
  INIT_STATE
} from '../../constants/action-types/round'

const defaultState = {
  isRoundEnded: false,
  shouldGameBeInitted: false,
  winner: undefined,
  level: 1
}

export default function roundInfo(state = defaultState, action) {
  switch (action.type) {
    case END_ROUND: {
      return {
        ...state,
        isRoundEnded: true,
        winner: action.payload
      }
    }
    case START_ROUND: {
      return {
        ...state,
        winner: 'hero',
        isRoundEnded: false,
        shouldGameBeInitted: true
      }
    }
    case START_INITTING_GAME: {
      return {
        ...state,
        shouldGameBeInitted: false
      }
    }
    case SET_LEVEL: {
      return {
        ...state,
        level: action.payload
      }
    }
    case INIT_STATE: {
      return {
        ...defaultState
      }
    }
    default: {
      return state
    }
  }
}
