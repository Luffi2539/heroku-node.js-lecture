import React from 'react'
import { connect } from 'react-redux'

import './screenshot-info.scss'

import { hideChoosedScreenshot, showChoosedScreenshot } from '../../../../../../actions/screenshots'

class ScreenshotInfo extends React.Component {
  state = {
    closeIcon: require('../../../../../../assets/close-icon.png'),
    leftArrowIcon: require('../../../../../../assets/arrow-left-icon.png'),
    rightArrowIcon: require('../../../../../../assets/arrow-right-icon.png')
  }

  hideMenu = () => {
    this.props.hideScreenshot()
  }

  changeScreenshot = (direction) => {
    // direction === 1 or -1 (respresenting direction of sliding)
    const { choosedScreenshotId } = this.props

    if (choosedScreenshotId + direction < 0 || choosedScreenshotId + direction > 5) {
      return
    }

    this.props.showAnotherScreenshot(choosedScreenshotId + direction)
  }

  render() {
    const { closeIcon, leftArrowIcon, rightArrowIcon } = this.state

    const screenshot = require(`../../../../../../assets/game-screenshot-${
      this.props.choosedScreenshotId
    }.png`)

    return (
      <div className="modal-mask">
        <div className="modal-wrapper" onClick={() => this.hideMenu()}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <img src={screenshot} />

            <button className="close-button" onClick={() => this.hideMenu()}>
              <img src={closeIcon} />
            </button>

            <button className="slide-left">
              <img src={leftArrowIcon} onClick={() => this.changeScreenshot(-1)} />
            </button>

            <button className="slide-right">
              <img src={rightArrowIcon} onClick={() => this.changeScreenshot(1)} />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    choosedScreenshotId: state.choosedScreenshot.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideScreenshot: () => dispatch(hideChoosedScreenshot()),
    showAnotherScreenshot: (id) => dispatch(showChoosedScreenshot(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenshotInfo)
