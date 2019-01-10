import React from 'react'

import './register-page.scss'

import RegisterForm from './components/Register-Form'
import GameRules from './components/Game-Rules'
import GameDescription from './components/Game-Description'


class RegisterPage extends React.Component {
  render() {
    return (
      <div className="register-page">
        <h1 className="bold">"ЖЕСТКАЯ ИГРА"</h1>
        <RegisterForm />
        <GameRules />
        <GameDescription />
      </div>
    )
  }
}

export default RegisterPage