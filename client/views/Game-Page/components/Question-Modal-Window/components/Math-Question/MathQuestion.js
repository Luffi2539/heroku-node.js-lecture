import React from 'react'
import { connect } from 'react-redux'

import './math-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import mathCaclulator from '../../../../../../helpers/questions/Math-Calculator'
import { setAnswerInfo } from '../../../../../../actions/question-answer'

class MathQuestion extends React.Component {
  state = {
    num1: undefined,
    num2: undefined,
    operation: undefined,
    result: undefined,
    userResult: '',
    error: ''
  }

  componentDidMount() {
    const { num1, num2, operation, result } = mathCaclulator.getMathTask()
    this.setState(() => {
      return {
        num1: num1,
        num2: num2,
        operation: operation,
        result: result
      }
    })
    window.addEventListener('keypress', this.handlePress)
    document.getElementById('answer-input').select()
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handlePress)
  }

  addErrorMessage = (msg) => {
    this.setState({
      error: msg,
    })
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
    const { num1, num2, operation, userResult, error } = this.state
    const { handleChange, checkUserAnswer } = this

    return (
      <div className="math-question-container">
        <h3>Какое значение выражения?</h3>
        <hr />
        <div>
          <div>
            {num1}
            {operation}
            {num2} =
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

export default connect(
  null,
  mapDispatchToProps
)(MathQuestion)
