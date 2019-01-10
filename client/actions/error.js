import { SET_ERROR_MESSAGE } from '../constants/action-types/error'

export function setErrorMessage(msg) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: msg
  }
}