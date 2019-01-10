import React from 'react'

import './health-bar.scss'

class HealthBar extends React.Component {
  calculateHealthWidth = () => {
    const { maxHealth, currentHealth } = this.props
    return ((currentHealth * 100) / maxHealth)
  }

  render() {
    const healthBarStyles = {
      width: `${this.calculateHealthWidth()}%`
    }

    return (
      <div className="health-bar">
        <div style={healthBarStyles}></div>
      </div>
    )
  }
}

export default HealthBar