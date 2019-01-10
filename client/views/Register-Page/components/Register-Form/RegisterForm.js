import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import './register-form.scss'

import StartGameButton from '../Start-Game-Button'

import { KEY_ENTER_CODE } from '../../../../constants/keyCodes'
import { addUser } from '../../../../actions/users'
import { setErrorMessage } from '../../../../actions/error'

class RegisterForm extends React.Component {
  state = {
    userName: ''
  }

  componentDidMount() {
    document.getElementById('register-input').select()
    window.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress)
  }

  handleChange = (e) => {
    e.persist()
    this.setState(() => {
      return {
        userName: e.target.value
      }
    })
  }

  handleKeyPress = (e) => {
    if (e.keyCode === KEY_ENTER_CODE) {
      e.preventDefault()
      this.registerUser()
      return false
    }
  }

  registerUser = () => {
    const { addUser, setErrorMessage } = this.props
    const { userName } = this.state
    if (userName.trim() === '') {
      setErrorMessage('Пожалуйста, введите ваш никнейм')
    } else {
      addUser(userName)
    }
  }

  render() {
    const { errorMsg } = this.props
    const { userName } = this.state
    const { handleChange, registerUser } = this

    return (
      <form className="medium-text">
        <h2>Регистрация</h2>
        <label htmlFor="user-name">Ник в игре</label>
        <input
          id="register-input"
          type="text"
          className="medium-text"
          placeholder="Введите свое имя"
          name="user-name"
          value={userName}
          onChange={handleChange}
        />
        {errorMsg && (
          <label htmlFor="user-name" className="error-message">
            {errorMsg}
          </label>
        )}
        <StartGameButton linkClasses="blue-white" registerUser={registerUser} />
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMsg: state.error.errorMsg
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addUser: (name) => dispatch(addUser(name, ownProps.history)),
    setErrorMessage: (msg) => {
      dispatch(setErrorMessage(msg))
      setTimeout(() => {
        dispatch(setErrorMessage(undefined))
      }, 2000)
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterForm)
)
