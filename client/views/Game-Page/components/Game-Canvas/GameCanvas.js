import React from 'react'
import { connect } from 'react-redux'

import './game-canvas.scss'

import animationWorker from '../../../../helpers/game/classes/AnimationsWorkek'
import {
  initHero,
  initBackground,
  initMonster,
  initFireSpell,
  initHealingSpell,
  initIceSpell,
  initLightingSpell
} from '../../../../helpers/game/initGameObjects'

import { setSpellsControllers } from '../../../../actions/spells'
import { setMonster, setMaxHealth } from '../../../../actions/monster'
import { startInittingGame } from '../../../../actions/round'
import { setHero } from '../../../../actions/hero'

class GameCanvas extends React.Component {
  componentDidMount() {
    const canvas = document.getElementById('game-canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  componentDidUpdate() {
    const { shouldGameBeInitted, startInittingCanvas } = this.props
    const { initializeGame } = this
    if (shouldGameBeInitted) {
      startInittingCanvas()
      const canvas = document.getElementById('game-canvas')
      const context = canvas.getContext('2d')
      initializeGame(context)
    }
  }

  initializeGame = (canvasContext) => {
    const gameObjects = this.initializeGameObjects(canvasContext)
    animationWorker.setGameObjects(...gameObjects)
    animationWorker.init()
    animationWorker.startAnimating()
    this.setState({ animationWorker })
  }

  initializeGameObjects = (canvasContext) => {
    const { setMonsterMaxHealth, level, setSpells, setMonster, setHero } = this.props
    const hero = initHero(canvasContext)
    const monster = initMonster(canvasContext)
    window.monster = monster
    const background = initBackground(canvasContext)
    const fireSpell = initFireSpell(hero, canvasContext)
    const healingSpell = initHealingSpell(hero, canvasContext)
    const iceSpell = initIceSpell(hero, canvasContext)
    const lightingSpell = initLightingSpell(hero, canvasContext)
    setSpells([fireSpell, healingSpell, iceSpell, lightingSpell])
    setHero(hero)
    setMonster(monster)
    setMonsterMaxHealth(level * 100)
    return [background, hero, monster, fireSpell, healingSpell, iceSpell, lightingSpell]
  }

  render() {
    return <canvas id="game-canvas" />
  }
}

function mapStateToProps(state) {
  return {
    canvasContext: state.canvasContext,
    shouldGameBeInitted: state.roundInfo.shouldGameBeInitted,
    level: state.roundInfo.level
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSpells: (spells) => dispatch(setSpellsControllers(spells)),
    setMonster: (monster) => dispatch(setMonster(monster)),
    setMonsterMaxHealth: (health) => dispatch(setMaxHealth(health)),
    startInittingCanvas: () => dispatch(startInittingGame()),
    setHero: (hero) => dispatch(setHero(hero))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameCanvas)
