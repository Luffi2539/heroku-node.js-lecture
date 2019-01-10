import React from 'react'
import { connect } from 'react-redux'

import Header from './components/Header'
import About from './components/About'
import Screenshots from './components/Screenshots'
import ScreenshotModalWindow from './components/Screenshots/components/Screenshot-Info'
import StartSection from './components/Start-Section'
import ContactInfo from './components/Contact-Info'

import './landing-page.scss'

class LandingPage extends React.Component {
  render() {
    const { isScreenshotInfoNeedToBeShown } = this.props

    return (
      <div className="landing-page">
        <Header />
        <About />
        <Screenshots />
        {isScreenshotInfoNeedToBeShown && <ScreenshotModalWindow />}
        <StartSection />
        <ContactInfo />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isScreenshotInfoNeedToBeShown: state.choosedScreenshot.needsToBeShown
  }
}

export default connect(
  mapStateToProps,
  null
)(LandingPage)
