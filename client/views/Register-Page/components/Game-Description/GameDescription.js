import React from 'react'

import './game-description.scss'

import SpellDescription from './components/Spell-Description/SpellDescription'
import spellsInfo from '../../../../constants/spellsIconsInfo'

class GameDescription extends React.Component {
  render() {
    const img = require(`../../../../assets/fire-spell-1-icon.jpg`)

    return (
      <section className="game-description">
        <h1>Описание игровой механики</h1>
        <p className="medium-text">
          Ваша задача - победить монстра, но как это можно сделать в этой игре?
        </p>
        <p className="medium-text">
          Для начала вам нужно выбрать заклинание. В игре есть два типа заклинаний:
        </p>
        <ul className="medium-text">
          <li>Те, что восполняют ваше здоровье</li>
          <li>И те, что наносят урон монстру</li>
        </ul>
        <p className="medium-text">
          Выбрать заклинание можно либо кликнув на него мышью, либо воспользовавшись клавиатурой
          (кнопками 1, 2, 3, 4)
        </p>
        <h1>Игровые заклинания:</h1>
        {spellsInfo.map((spell) => (
          <SpellDescription
            key={spell.id}
            imgName={spell.imgName}
            spellName={spell.spellName}
            spanClassName={spell.spanClassName}
            description={spell.description}
          />
        ))}
        <h1>Вопрос к заклинанию</h1>
        <p className="medium-text">
          После того как вы выбрали заклинание, вам будет задан вопрос.<br/>
          Сложность вопроса зависит от выбранного заклинания.<br/>
          Если вы ответите на вопрос правильно - вы успешно кастуете заклинание.<br/>
          В противном случае, монстр атакует вас, уворачиваться<br/>
          <span className="fire-spell-color"> БЕ-СПО-ЛЕ-ЗНО</span>
        </p>
      </section>
    )
  }
}

export default GameDescription
