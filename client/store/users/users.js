import { SET_USERS } from '../../constants/action-types/users'

export default function (state = { users: [] }, action) {
  switch (action.type) {
    case SET_USERS: {
      return {
        users: action.payload
      }
    }
    default: {
      return state
    }
  }
}