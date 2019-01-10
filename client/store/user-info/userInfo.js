import { CHANGE_USER_NAME } from '../../constants/action-types/user'

export default function userInfo(state = { name: undefined }, action) {
  switch (action.type) {
    case CHANGE_USER_NAME: {
      return {
        name: action.payload
      }
    }
    default: {
      return state
    }
  }
}