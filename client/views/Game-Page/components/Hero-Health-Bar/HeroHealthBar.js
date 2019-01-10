import React from 'react'
import { connect } from 'react-redux'

import './hero-health-bar.scss'

import HealthBar from '../Health-Bar'

class HeroHealthBar extends React.Component {
  render() {
    const { userName, health, maxHealth } = this.props

    return (
    <div className="hero-health-bar">
      <h3 className="huge-text bold">{userName}</h3>
      <HealthBar maxHealth={maxHealth} currentHealth={health} />
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userName: state.userInfo.name,
    health: state.heroInfo.currentHealth,
    maxHealth: state.heroInfo.maxHealth
  }
}

export default connect(
  mapStateToProps,
  null
)(HeroHealthBar)
