import React from 'react'

import './start-section.scss'

import StartRegistrationButton from '../Start-Registration-Button'

class StartSection extends React.Component {
  render() {
    return (
      <section className="start-section">
        <h1 className="huge-text bold">Вперёд к победам над монстрами!</h1>
        <hr/>
        <p className="medium-text">
          Ты сможешь победить всех монстров в этом опасном и жестоком мире.
          Волшебный посох в руки и в бой!
        </p>
        <StartRegistrationButton linkClasses={'white-black'}/>
      </section>
    )
  }
}

export default StartSection