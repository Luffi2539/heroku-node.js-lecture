import React from 'react'
import { connect } from 'react-redux'

import './calculate-speed-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import mathCaclulator from '../../../../../../helpers/questions/Math-Calculator'
import { setAnswerInfo } from '../../../../../../actions/question-answer'

class CalculateSpeedQuestion extends React.Component {
  state = {
    time: undefined,
    distance: undefined,
    result: undefined,
    userResult: '',
    error: ''
  }

  componentDidMount() {
    const { time, distance, result } = mathCaclulator.getCalculateSpeedTask()
    this.setState(() => {
      return {
        time,
        distance,
        result
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
    const { distance, time, userResult, error } = this.state
    const { handleChange, checkUserAnswer } = this

    return (
      <div className="calculate-speed-question-container">
        <h3>Рассчитайте скорость тела</h3>
        <hr />
        <div>
          <div>
            <span>S (расстояние) = {distance}</span>
            <span>t (время) = {time}</span>
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
)(CalculateSpeedQuestion)
