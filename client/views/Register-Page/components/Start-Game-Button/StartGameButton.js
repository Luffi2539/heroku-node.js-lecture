import React from 'react'

import './start-game-button.scss'

class StartGameButton extends React.Component {
  registerUserAndStartGame = () => {
    const { registerUser } = this.props

    registerUser()
  }

  render() {
    const { linkClasses } = this.props
    const { registerUserAndStartGame } = this

    return (
      <button
        type="button"
        className={'start-game-button medium-text ' + linkClasses}
        onClick={() => registerUserAndStartGame()}
      >
        Играть
      </button>
    )
  }
}

export default StartGameButton
