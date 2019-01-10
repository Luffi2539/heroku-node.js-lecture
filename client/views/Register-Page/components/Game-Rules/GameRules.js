import React from 'react'

import './game-rules.scss'


class GameRules extends React.Component {
  render() {
    return (
      <section className="game-rules-container">
        <h2 className="bold">Правила</h2>
        <ol>
          <li>У игрока и монстра 100 хп.</li>
          <li>Игрок ходит первым, выбирает заклинание.</li>
          <li>Если игрок правильно отвечает, то наносит урон или монстру или лечит себя.</li>
          <li>Если игрок отвечает не правильно, то получает урон.</li>
          <li>Когда игрок убивает монстра, появляется новый монстр с большей атакой.</li>
          <li>Когда умирает герой, показывается таблица рекордов.</li>
        </ol>
      </section>
    )
  }
}

export default GameRules