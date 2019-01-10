import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import './comparison-question.scss'

import {
  KEY_ENTER_CODE,
  KEY_1_CODE,
  KEY_2_CODE,
  KEY_3_CODE
} from '../../../../../../constants/keyCodes'
import mathCalculator from '../../../../../../helpers/questions/Math-Calculator'
import { setAnswerInfo } from '../../../../../../actions/question-answer'

class ComparisonQuestion extends React.Component {
  state = {
    userResult: '',
    num1: undefined,
    num2: undefined,
    operation: undefined,
    choosedOptionId: undefined,
    error: ''
  }

  componentDidMount() {
    const { num1, num2, operation } = mathCalculator.getEquelityTask()
    this.setState({
      num1,
      num2,
      operation
    })
    window.addEventListener('keypress', this.handlePress)
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handlePress)
  }

  handlePress = (e) => {
    if (KEY_ENTER_CODE === e.keyCode) {
      this.checkUserAnswer()
    } else if (KEY_1_CODE === e.keyCode) {
      this.setState({
        userResult: '<',
        choosedOptionId: 0
      })
    } else if (KEY_2_CODE === e.keyCode) {
      this.setState({
        userResult: '=',
        choosedOptionId: 1
      })
    } else if (KEY_3_CODE === e.keyCode) {
      this.setState({
        userResult: '>',
        choosedOptionId: 2
      })
    }
  }

  handleChange = (choosedOptionChar, id) => {
    this.addErrorMessage('')
    this.setState({
      userResult: choosedOptionChar,
      choosedOptionId: id
    })
  }

  addErrorMessage = (msg) => {
    this.setState({
      error: msg
    })
  }

  checkUserAnswer = () => {
    const { addErrorMessage } = this
    const { userResult, operation } = this.state
    const { setAnswerInfo } = this.props

    if (userResult === '') {
      addErrorMessage('Сделайте выбор')
      return
    }

    if (userResult === operation) {
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
    const { handleChange, checkUserAnswer } = this
    const { num1, num2, choosedOptionId, error } = this.state

    const isFirstChoosed = choosedOptionId === 0
    const isSecondChoosed = choosedOptionId === 1
    const isThirdChoosed = choosedOptionId === 2

    return (
      <div className="comparison-question-container">
        <h3>Сравните числа</h3>
        <hr />
        <div>
          <div className="example">
            {num1} ? {num2}
          </div>
          <div className="answers">
            <span
              onClick={() => handleChange('<', 0)}
              className={cx({ 'choosed-option': isFirstChoosed })}
            >
              {'<'}
            </span>
            <span
              onClick={() => handleChange('=', 1)}
              className={cx({ 'choosed-option': isSecondChoosed })}
            >
              {'='}
            </span>
            <span
              onClick={() => handleChange('>', 2)}
              className={cx({ 'choosed-option': isThirdChoosed })}
            >
              {'>'}
            </span>
          </div>
          {error && <span className="error-message">{error}</span>}
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

export default connect(
  null,
  mapDispatchToProps
)(ComparisonQuestion)
