import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import GameCanvas from './components/Game-Canvas'
import SpellBar from './components/Spell-Bar'
import HeroHealthBar from './components/Hero-Health-Bar'
import MonsterHealthBar from './components/Monster-Health-Bar'
import QuestionModalWindow from './components/Question-Modal-Window'
import Stats from './components/Stats'

import { healHero, damageHero } from '../../actions/hero'
import { damageMonster } from '../../actions/monster'
import { startSpellCasting, finishSpellCasting } from '../../actions/spells'
import { addScore } from '../../actions/score'
import { setInitialQuestionState } from '../../actions/question-answer'
import { startRound, endRound, initState } from '../../actions/round'

import apiWorker from '../../helpers/api/ApiWorker'

class GamePage extends React.Component {
  componentDidMount() {
    const { userName, history, startRound } = this.props
    if (!userName) {
      history.push('/registration')
    } else {
    startRound()

    const body = document.querySelector('body')
    body.style.overflowY = 'hidden'
    }
  }

  componentWillUnmount() {
    const { userName, score, initState } = this.props
    apiWorker.updateUserScore(userName, score)
    initState()
    const body = document.querySelector('body')
    body.style.overflowY = 'scroll'
  }

  componentDidUpdate() {
    const {
      isQuestionAsked,
      isQuestionAnswered,
      isUserAnswerCorrect,
      setInitialQuestionState
    } = this.props
    const { castSpell, atackHero } = this
    if (!isQuestionAsked && isQuestionAnswered) {
      if (isUserAnswerCorrect) {
        castSpell()
      } else {
        atackHero()
      }
      setInitialQuestionState()
    }
  }

  castSpell = () => {
    const {
      spells,
      spellType,
      spellPoints,
      spellElement,
      healHero,
      damageMonster,
      finishSpellCasting,
      addScore
    } = this.props
    const { calculateDamage } = this

    switch (spellElement) {
      case 'fire': {
        spells.fireSpell.castSpell()
        break
      }
      case 'nature': {
        spells.healingSpell.castSpell()
        break
      }
      case 'ice': {
        spells.iceSpell.castSpell()
        break
      }
      case 'lighting': {
        spells.lightingSpell.castSpell()
        break
      }
    }

    setTimeout(() => {
      finishSpellCasting()
      if (spellType === 'damage') {
        damageMonster(spellPoints)
      } else {
        healHero(spellPoints)
      }
      addScore(spellPoints)
      calculateDamage()
    }, 1200)
  }

  atackHero = () => {
    const {
      startSpellCasting,
      monster,
      damageHero,
      monsterDamage,
      finishSpellCasting,
      level
    } = this.props
    const { calculateDamage } = this

    startSpellCasting()
    monster.atackHero()

    setTimeout(() => {
      const additionalDamage = Number(level) * 5
      damageHero(monsterDamage + additionalDamage)
      calculateDamage()

      setTimeout(() => {
        finishSpellCasting()
      }, 1000)
    }, 1400)
  }

  calculateDamage = () => {
    const { isMonsterDead, isHeroDead, endRound, monster, hero } = this.props

    if (isHeroDead) {
      hero.die()
      setTimeout(() => {
        endRound('monster')
      }, 1250)
    } else if (isMonsterDead) {
      monster.die()
      setTimeout(() => {
        endRound('hero')
      }, 1250)
    }
  }

  render() {
    const { isQuestionAsked, isRoundEnded } = this.props

    return (
      <div className="game-page">
        {isQuestionAsked && <QuestionModalWindow />}
        <GameCanvas />
        <SpellBar />
        <HeroHealthBar />
        <MonsterHealthBar />
        {isRoundEnded && <Stats />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    spells: state.spellsControllers,
    spellType: state.castedSpellInfo.spellType,
    spellPoints: state.castedSpellInfo.spellPoints,
    spellElement: state.castedSpellInfo.spellElement,
    isHeroDead: state.heroInfo.isDead,
    hero: state.heroInfo.hero,
    isMonsterDead: state.monsterInfo.isDead,
    monster: state.monsterInfo.monster,
    monsterDamage: state.monsterInfo.damage,
    isQuestionAsked: state.questionInfo.isAsked,
    isQuestionAnswered: state.questionInfo.isAnswered,
    isUserAnswerCorrect: state.questionInfo.isUserAnswerCorrect,
    isRoundEnded: state.roundInfo.isRoundEnded,
    winner: state.roundInfo.winner,
    level: state.roundInfo.level,
    score: state.scoreInfo.score,
    userName: state.userInfo.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    healHero: (healpoints) => dispatch(healHero(healpoints)),
    damageMonster: (damagepoints) => dispatch(damageMonster(damagepoints)),
    damageHero: (damagepoints) => dispatch(damageHero(damagepoints)),
    startSpellCasting: () => dispatch(startSpellCasting()),
    finishSpellCasting: () => dispatch(finishSpellCasting()),
    setInitialQuestionState: () => dispatch(setInitialQuestionState()),
    addScore: (score) => dispatch(addScore(score)),
    initState: () => dispatch(initState()),
    startRound: () => dispatch(startRound()),
    endRound: (winner) => dispatch(endRound(winner))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GamePage)
)
