import React from 'react'
import { connect } from 'react-redux'

import './monster-health-bar.scss'

import HealthBar from '../Health-Bar'

class MonsterHealthBar extends React.Component {
  render() {
    const { monsterName, maxHealth, health } = this.props

    return (
    <div className="monster-health-bar">
      <h3 className="huge-text bold">{monsterName}</h3>
      <HealthBar maxHealth={maxHealth} currentHealth={health}/>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    monsterName: state.monsterInfo.monsterName,
    health: state.monsterInfo.currentHealth,
    maxHealth: state.monsterInfo.maxHealth
  }
}

export default connect(
  mapStateToProps,
  null
)(MonsterHealthBar)