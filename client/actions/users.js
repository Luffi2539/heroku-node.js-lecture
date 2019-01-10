import apiWorker from '../helpers/api/ApiWorker'

import { changeUserName } from './user'
import { setErrorMessage } from './error'

import { SET_USERS } from '../constants/action-types/users'

export function fetchUsers() {
  const request = apiWorker.getUsers()

  return (dispatch) => {
    request
      .then((users) => {
        dispatch({
          type: SET_USERS,
          payload: users
        })
      })
      .catch((err) => console.log(err))
  }
}

export function addUser(name, history) {
  const request = apiWorker.addUser(name)

  return (dispatch) => {
    request
      .then((user) => {
        dispatch(changeUserName(user.name))
        history.push('/game')
      })
      .catch((err) => {
        dispatch(setErrorMessage(err))
        setTimeout(() => {
          dispatch(setErrorMessage(undefined))
        }, 2000)
      })
  }
}
