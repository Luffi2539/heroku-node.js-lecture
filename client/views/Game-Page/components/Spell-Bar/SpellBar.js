import React from 'react'
import { connect } from 'react-redux'

import './spell-bar.scss'

import Spell from './components/Spell'
import spellsList from '../../../../constants/spellsIconsInfo'
import { KEY_1_CODE, KEY_2_CODE, KEY_3_CODE, KEY_4_CODE } from '../../../../constants/keyCodes'
import { startSpellCasting, finishSpellCasting } from '../../../../actions/spells'
import { setCastedSpellInfo } from '../../../../actions/spell-info'
import { askQuestion } from '../../../../actions/question-answer'

class SpellBar extends React.Component {
  state = {
    isSomeSpellPressed: false,
    pressedSpellId: undefined
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown = (e) => {
    let pressedSpellId
    if (e.keyCode === KEY_1_CODE) {
      pressedSpellId = 0
    } else if (e.keyCode === KEY_2_CODE) {
      pressedSpellId = 1
    } else if (e.keyCode === KEY_3_CODE) {
      pressedSpellId = 2
    } else if (e.keyCode === KEY_4_CODE) {
      pressedSpellId = 3
    }
    this.setState(() => {
      return {
        isSomeSpellPressed: true,
        pressedSpellId
      }
    })
  }

  handleKeyUp = (e) => {
    const { castFireSpell, castHealingSpell, castIceSpell, castLightingSpell } = this
    const { isSpellCasting } = this.props

    this.setState(() => {
      return {
        isSomeSpellPressed: false,
        pressedSpellId: undefined
      }
    })

    if (isSpellCasting) {
      return
    }

    if (e.keyCode === KEY_1_CODE) {
      castFireSpell()
    } else if (e.keyCode === KEY_2_CODE) {
      castHealingSpell()
    } else if (e.keyCode === KEY_3_CODE) {
      castIceSpell()
    } else if (e.keyCode === KEY_4_CODE) {
      castLightingSpell()
    }
  }

  handleClick = (id) => {
    const { castFireSpell, castHealingSpell, castIceSpell, castLightingSpell } = this
    if (id === 0) {
      castFireSpell()
    } else if (id === 1) {
      castHealingSpell()
    } else if (id === 2) {
      castIceSpell()
    } else {
      castLightingSpell()
    }
  }

  castFireSpell = () => {
    const { startSpellCasting, spells, setCastedSpellInfo, askQuestion } = this.props
    this.setState({ isSpellCasting: true })
    setCastedSpellInfo({
      spellType: 'damage',
      spellPoints: spells.fireSpell.getDamageOrHealingPoints(),
      spellElement: 'fire'
    })
    startSpellCasting()
    askQuestion()
  }

  castIceSpell = () => {
    const { startSpellCasting, spells, setCastedSpellInfo, askQuestion } = this.props
    this.setState({ isSpellCasting: true })
    setCastedSpellInfo({
      spellType: 'damage',
      spellPoints: spells.iceSpell.getDamageOrHealingPoints(),
      spellElement: 'ice'
    })
    startSpellCasting()
    askQuestion()
  }

  castHealingSpell = () => {
    const { startSpellCasting, spells, setCastedSpellInfo, askQuestion } = this.props
    this.setState({ isSpellCasting: true })
    setCastedSpellInfo({
      spellType: 'heal',
      spellPoints: spells.healingSpell.getDamageOrHealingPoints(),
      spellElement: 'nature'
    })
    startSpellCasting()
    askQuestion()
  }

  castLightingSpell = () => {
    const { startSpellCasting, spells, setCastedSpellInfo, askQuestion } = this.props
    this.setState({ isSpellCasting: true })
    setCastedSpellInfo({
      spellType: 'damage',
      spellPoints: spells.lightingSpell.getDamageOrHealingPoints(),
      spellElement: 'lighting'
    })
    startSpellCasting()
    askQuestion()
  }

  render() {
    const { isSomeSpellPressed, pressedSpellId } = this.state
    const { isSpellCasting } = this.props

    return (
      <div className="spell-bar">
        {spellsList.map((spell, id) => {
          if (isSpellCasting) {
            // freeze all spells while casting some spell
            return (
              <Spell
                key={id}
                imgName={spell.imgName}
                id={id}
                isPressed={true}
                handleClick={() => this.handleClick(id)}
              />
            )
          }
          if (isSomeSpellPressed && id === pressedSpellId) {
            // handle press on some spell
            return (
              <Spell
                key={id}
                spellName={spell.name}
                imgName={spell.imgName}
                id={id}
                isPressed={true}
                handleClick={() => this.handleClick(id)}
              />
            )
          }
          // default, unhighlited behaviour
          return (
            <Spell
              key={id}
              spellName={spell.name}
              imgName={spell.imgName}
              id={id}
              isPressed={false}
              handleClick={() => this.handleClick(id)}
            />
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    spells: state.spellsControllers,
    isSpellCasting: state.spellsControllers.isSpellCasting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startSpellCasting: () => dispatch(startSpellCasting()),
    finishSpellCasting: () => dispatch(finishSpellCasting()),
    setCastedSpellInfo: (spellInfo) => dispatch(setCastedSpellInfo(spellInfo)),
    askQuestion: () => dispatch(askQuestion())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpellBar)
