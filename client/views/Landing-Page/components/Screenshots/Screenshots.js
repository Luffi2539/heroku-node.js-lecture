import React from 'react'

import './screenshots.scss'

import Screenshot from './components/Screenshot/Screenshot'

import screenshotsInfo from '../../../../constants/screenshots-description'

class Screenshots extends React.Component {
  render() {
    return (
      <section id="screenshots">
        <div>
          <Screenshot imgId={0} text={screenshotsInfo[0].text}/>
          <Screenshot imgId={1} text={screenshotsInfo[1].text}/>
          <Screenshot imgId={2} text={screenshotsInfo[2].text}/>
        </div>
        <div>
          <Screenshot imgId={3} text={screenshotsInfo[3].text}/>
          <Screenshot imgId={4} text={screenshotsInfo[4].text}/>
          <Screenshot imgId={5} text={screenshotsInfo[5].text}/>
        </div>
      </section>
    )
  }
}

export default Screenshots