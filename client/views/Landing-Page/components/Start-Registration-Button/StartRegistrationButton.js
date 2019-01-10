import React from 'react'
import { withRouter } from 'react-router'

import './start-registration-button.scss'

class StartRegistrationButton extends React.Component {
  startRegistration = () => {
    const { history } = this.props
    history.push('/registration')
  }

  render() {
    const { linkClasses } = this.props
    const { startRegistration } = this

    return (
      <button
        className={'start-registration-button medium-text ' + linkClasses}
        onClick={() => startRegistration()}
      >
        Играть
      </button>
    )
  }
}

export default withRouter(StartRegistrationButton)
