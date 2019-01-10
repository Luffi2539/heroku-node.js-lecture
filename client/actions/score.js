import { RESET_SCORE, ADD_SCORE } from '../constants/action-types/score'

export function resetScore() {
  return {
    type: RESET_SCORE
  }
}

export function addScore(score) {
  return {
    type: ADD_SCORE,
    payload: score
  }
}