import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import './redirect-buttons.scss'

import { startRound, setLevel } from '../../../../../../actions/round'
import { resetScore } from '../../../../../../actions/score'

class RedirectButtons extends React.Component {
  nextLevel = () => {
    const { startRound, setLevel, level } = this.props
    setLevel(level + 1)
    startRound()
  }

  newGame = () => {
    const { startRound, setLevel, resetScore } = this.props
    setLevel(1)
    resetScore()
    startRound()
  }

  handleRedirect = () => {
    const { history } = this.props
    history.push('/')
  }

  render() {
    const { winner } = this.props
    const { nextLevel, newGame, handleRedirect } = this

    return (
      <div className="redirect-buttons-container">
        {winner === 'hero' ? (
          <button onClick={() => nextLevel()}>Следующий монстр</button>
        ) : (
          <button onClick={() => newGame()}>Начать заного</button>
        )}
        <button onClick={() => handleRedirect()}>На главную страницу</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    winner: state.roundInfo.winner,
    level: state.roundInfo.level
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startRound: () => dispatch(startRound()),
    setLevel: (level) => dispatch(setLevel(level)),
    resetScore: () => dispatch(resetScore()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectButtons))
