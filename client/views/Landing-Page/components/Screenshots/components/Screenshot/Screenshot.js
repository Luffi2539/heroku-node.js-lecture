import React from 'react'
import { connect } from 'react-redux'

import './screenshot.scss'

import { showChoosedScreenshot } from '../../../../../../actions/screenshots'


class Screenshot extends React.Component {
  state = {
    img: require(`../../../../../../assets/game-screenshot-${this.props.imgId}.png`)
  }

  showMenu = () => {
    const { showScreenshot, imgId } = this.props
    showScreenshot(imgId)
  }

  render() {
    const { showMenu } = this
    const { img } = this.state
    const { text } = this.props

    return (
      <a className="screenshot-wrapper" onClick={() => showMenu()}>
        <img className="screenshot" src={img} />
        <div className="screenshot-caption">
          <h1 className="medium-text">Геймплей</h1>
          <p className="medium-text">{text}</p>
        </div>
      </a>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showScreenshot: (id) => dispatch(showChoosedScreenshot(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Screenshot)
