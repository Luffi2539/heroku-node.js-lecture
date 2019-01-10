import React from 'react'
import { connect } from 'react-redux'

import './question-modal-window.scss'

import getRandomNumber from '../../../../helpers/getRandomNumber'

import MathQuestion from './components/Math-Question'
import TranslateQuestion from './components/Translate-Question'
import SequenceQuestion from './components/Sequence-Question'
import CalculateSpeedQuestion from './components/Calculate-Speed-Question'

import ComparisonQuestion from './components/Comparison-Question'
import MixedLettersQuestion from './components/Mixed-Letters-Question'
import ExtraWordQuestion from './components/Extra-Word-Question'
import SquareQuestion from './components/Square-Question'

import TTSQuestion from './components/TTS-Question'
import AnimalQuestion from './components/Animal-Question'
import SortNumbersQuestion from './components/Sort-Numbers-Question'
import BalloonBurstQuestion from './components/Balloon-Burst-Question'

import GeographyQuestion from './components/Geography-Question'
import CarMarksQuestion from './components/Car-Marks-Question'
import CapitalsQuestion from './components/Capitals-Question'

const fireSpellQuestions = [
  <MathQuestion />,
  <TranslateQuestion />,
  <SequenceQuestion />,
  <CalculateSpeedQuestion />
]

const iceSpellQuestions = [
  <ComparisonQuestion />,
  <MixedLettersQuestion />,
  <ExtraWordQuestion />,
  <SquareQuestion />
]

const natureSpellQuestions = [
  <TTSQuestion />,
  <AnimalQuestion />,
  <SortNumbersQuestion />,
  <BalloonBurstQuestion />
]

const lightingSpellQuestions = [<GeographyQuestion />, <CarMarksQuestion />, <CapitalsQuestion />]

class QuestionModalWindow extends React.Component {
  getRandomQuestionToAsk = () => {
    const { spellElement } = this.props
    if (spellElement === 'fire') {
      return fireSpellQuestions[getRandomNumber(0, fireSpellQuestions.length)]
    } else if (spellElement === 'ice') {
      return iceSpellQuestions[getRandomNumber(0, iceSpellQuestions.length)]
    } else if (spellElement === 'nature') {
      return natureSpellQuestions[getRandomNumber(0, natureSpellQuestions.length)]
    } else {
      return lightingSpellQuestions[getRandomNumber(0, lightingSpellQuestions.length)]
    }
  }

  render() {
    const questionToAsk = this.getRandomQuestionToAsk()

    return (
      <div className="modal-question-mask">
        <div className="modal-question-wrapper">{questionToAsk}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    spellElement: state.castedSpellInfo.spellElement
  }
}

export default connect(
  mapStateToProps,
  null
)(QuestionModalWindow)
