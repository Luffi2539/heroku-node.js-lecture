import {
  END_ROUND,
  START_ROUND,
  START_INITTING_GAME,
  SET_LEVEL,
  INIT_STATE
} from '../constants/action-types/round'

export function endRound(winner) {
  return {
    type: END_ROUND,
    payload: winner
  }
}

export function startRound() {
  return {
    type: START_ROUND
  }
}

export function startInittingGame() {
  return {
    type: START_INITTING_GAME
  }
}

export function setLevel(level) {
  return {
    type: SET_LEVEL,
    payload: level
  }
}

export function initState() {
  return {
    type: INIT_STATE
  }
}
