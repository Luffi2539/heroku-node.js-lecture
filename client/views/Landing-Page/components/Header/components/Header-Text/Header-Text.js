import React from 'react'

import './header-text.scss'

import StartRegistrationButton from '../../../Start-Registration-Button'

class HeaderText extends React.Component {
  render() {
    return (
      <div className="header-text-container huge-text">
        <h1>ЖЕСТКАЯ ИГРА</h1>
        <hr/>
        <p className="medium-text">
          Добро пожаловать в «Жесткую игру». Вас ждут захватывающие сражения и сложные задания.Вы
          можете стать лучше всех, сражаясь с безжалостными монстрами. Вперед, на встречу
          приключениям!
        </p>
        <StartRegistrationButton linkClasses={'orange-white'}/>
      </div>
    )
  }
}

export default HeaderText
