import React from 'react'
import { connect } from 'react-redux'

import './sequence-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import mathCalculator from '../../../../../../helpers/questions/Math-Calculator'

import { setAnswerInfo } from '../../../../../../actions/question-answer'


class SequenceQuestion extends React.Component {
  state = {
    userResult: '',
    num1: undefined,
    num2: undefined,
    result: undefined,
    error: ''
  }

  componentDidMount() {
    const { num1, num2, result } = mathCalculator.getSequenceTask()
    this.setState({
      num1,
      num2,
      result
    })
    window.addEventListener('keypress', this.handlePress)
    document.getElementById('answer-input').select()
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handlePress)
  }

  handlePress = (e) => {
    if (KEY_ENTER_CODE === e.keyCode) {
      this.checkUserAnswer()
    }
  }

  handleChange = (e) => {
    this.addErrorMessage('')
    e.persist()
    this.setState(() => {
      return {
        userResult: e.target.value
      }
    })
  }

  addErrorMessage = (msg) => {
    this.setState({
      error: msg,
    })
  }

  checkUserAnswer = () => {
    const { addErrorMessage } = this
    const { userResult, result } = this.state
    const { setAnswerInfo } = this.props

    if (userResult === '') {
      addErrorMessage('Заполните поле')
      return
    }

    if (Number(userResult) === Number(result)) {
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
    const { userResult, num1, num2, error } = this.state
    const { checkUserAnswer, handleChange } = this

    return (
      <div className="sequence-question-container">
        <h3>Продолжите последовательность чисел</h3>
        <hr />
        <div>
          <div>
            {num1}-{num2}-?
          </div>
          <input
            id="answer-input"
            type="text"
            onChange={handleChange}
            value={userResult}
            placeholder="Введите ваш ответ"
          />
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

export default connect(null, mapDispatchToProps)(SequenceQuestion)