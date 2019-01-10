import React from 'react'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import './mixed-letters-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import translateHelper from '../../../../../../helpers/questions/Translate-Helper'
import getRandomNumber from '../../../../../../helpers/getRandomNumber'
import Letter from './components/Letter'

import { setAnswerInfo } from '../../../../../../actions/question-answer'

class MixedLettersQuestion extends React.Component {
  state = {
    word: undefined,
    letters: []
  }

  mixLetters = (letters) => {
    const lettersCopy = [].concat(letters)
    const lettersLegnth = lettersCopy.length
    const newLetters = []

    for (let i = 0; i < lettersLegnth; i++) {
      newLetters.push(lettersCopy.splice(getRandomNumber(0, lettersCopy.length), 1)[0])
    }
    return newLetters
  }

  componentDidMount() {
    const { word } = translateHelper.getTask()
    this.setState({
      word: word,
      letters: this.mixLetters(word.split('').map((letter, id) => {
        return {
          letter,
          id
        }
      }))
    })
    window.addEventListener('keypress', this.handlePress)
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handlePress)
  }

  handlePress = (e) => {
    if (KEY_ENTER_CODE === e.keyCode) {
      this.checkUserAnswer()
    }
  }

  moveLetter = (dragIndex, hoverIndex) => {
    const { letters } = this.state
    const dragCard = letters[dragIndex]

    this.setState(() => {
      const lettersCopy = [...letters]
      lettersCopy.splice(dragIndex, 1)
      lettersCopy.splice(hoverIndex, 0, dragCard)
      return {
        letters: lettersCopy
      }
    })
  }

  checkUserAnswer = () => {
    const { letters, word } = this.state
    const { setAnswerInfo } = this.props

    if (letters.map((x) => x.letter).join('') === word) {
      setAnswerInfo({
        isAnswered: true,
        isUserAnswerCorrect: true,
        isAsked: false
      })
    } else {
      setAnswerInfo({
        isAnswered: true,
        isUserAnswerCorrect: false,
        isAsked: false
      })
    }
  }

  render() {
    const { letters } = this.state
    const { moveLetter, checkUserAnswer } = this

    return (
      <div className="mixed-letters-question-container">
        <h3>Поставьте буквы в правильном порядке</h3>
        <hr />
        <div className="letters-container">
          {letters.map((letterObj, index) => {
            return (
              <Letter
                key={letterObj.id}
                letter={letterObj.letter}
                moveLetter={moveLetter}
                id={letterObj.id}
                index={index}
              />
            )
          })}
        </div>
        <hr />
        <button onClick={checkUserAnswer}>Ответить</button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAnswerInfo: (answerInfo) => dispatch(setAnswerInfo(answerInfo))
  }
}

export default connect(null, mapDispatchToProps)(DragDropContext(HTML5Backend)(MixedLettersQuestion))
