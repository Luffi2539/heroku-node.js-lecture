import { CHANGE_USER_NAME } from '../constants/action-types/user'


export function changeUserName(newName) {
  return {
    type: CHANGE_USER_NAME,
    payload: newName
  }
}