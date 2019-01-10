import React from 'react'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import './sort-numbers-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import mathCalculator from '../../../../../../helpers/questions/Math-Calculator'
import getRandomNumber from '../../../../../../helpers/getRandomNumber'
import Number from './components/Number'

import { setAnswerInfo } from '../../../../../../actions/question-answer'

class SortNumbersQuestion extends React.Component {
  state = {
    result: undefined,
    numbers: [],
    taskDescription: undefined
  }

  mixNumbers = (numbers) => {
    const numbersCopy = [].concat(numbers)
    const numbersLength = numbersCopy.length
    const newNumbers = []

    for (let i = 0; i < numbersLength; i++) {
      newNumbers.push(numbersCopy.splice(getRandomNumber(0, numbersCopy.length), 1)[0])
    }
    return newNumbers
  }

  componentDidMount() {
    const { numbers, taskDescription, result } = mathCalculator.getSortNumbersTask()
    this.setState({
      taskDescription,
      result,
      numbers: this.mixNumbers(numbers.map((number, id) => {
        return {
          number,
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

  moveNumber = (dragIndex, hoverIndex) => {
    const { numbers } = this.state
    const dragCard = numbers[dragIndex]

    this.setState(() => {
      const numbersCopy = [...numbers]
      numbersCopy.splice(dragIndex, 1)
      numbersCopy.splice(hoverIndex, 0, dragCard)
      return {
        numbers: numbersCopy
      }
    })
  }

  checkUserAnswer = () => {
    const { numbers, result } = this.state
    const { setAnswerInfo } = this.props

    if (numbers.map((numberObj) => numberObj.number).join('') === result) {
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
    const { numbers, taskDescription } = this.state
    const { moveNumber, checkUserAnswer } = this

    return (
      <div className="sort-numbers-question-container">
        <h3>{taskDescription}</h3>
        <hr />
        <div className="numbers-container">
          {numbers.map((numberObj, index) => {
            return (
              <Number
                key={numberObj.id}
                number={numberObj.number}
                moveNumber={moveNumber}
                id={numberObj.id}
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

export default connect(null, mapDispatchToProps)(DragDropContext(HTML5Backend)(SortNumbersQuestion))
