import React from 'react'
import { connect } from 'react-redux'

import './stats.scss'

import ScoreTable from './components/Score-Table'
import RedirectButtons from './components/Redirect-Buttons'

import { fetchUsers } from '../../../../actions/users'

import apiWorker from '../../../../helpers/api/ApiWorker'

class Stats extends React.Component {
  componentDidMount() {
    const { fetchUsers, userName, score } = this.props
    apiWorker.updateUserScore(userName, score).then(() => {
      fetchUsers()
    })
  }

  render() {
    const { winner, monsterName, userName } = this.props

    return (
      <div className="modal-stats-mask">
        <div className="modal-stats-wrapper">
          <div className="modal-stats-container">
            {winner === 'hero' && <h1>Победил {userName}</h1>}
            {winner === 'monster' && <h1>Победил {monsterName}</h1>}
            <h2>Таблица рекордов</h2>
            <ScoreTable />
            <RedirectButtons />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    winner: state.roundInfo.winner,
    monsterName: state.monsterInfo.monsterName,
    userName: state.userInfo.name,
    score: state.scoreInfo.score,
    level: state.roundInfo.level
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    addUser: (name) => dispatch(addUser(name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats)
