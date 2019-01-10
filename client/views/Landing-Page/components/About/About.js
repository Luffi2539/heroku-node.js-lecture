import React from 'react'

import './about.scss'

import StartRegistrationButton from '../Start-Registration-Button'


class About extends React.Component {
  render() {
    return (
      <section id="about">
        <h1 className="huge-text">Что тебя ждет?</h1>
        <hr/>
        <p className="medium-text">
          Регистрируйся, сражайся с монстрами используя свои знания.
          Будь жестким как эта игра!
          Нет...Будь жестче чем эта игра!
        </p>
        <StartRegistrationButton linkClasses={'white-black'}/>
      </section>
    )
  }
}

export default About