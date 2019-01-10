import React from 'react'
import { connect } from 'react-redux'

import './square-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import mathCaclulator from '../../../../../../helpers/questions/Math-Calculator'
import { setAnswerInfo } from '../../../../../../actions/question-answer'

class SquareQuestion extends React.Component {
  state = {
    num1: undefined,
    num2: undefined,
    result: undefined,
    userResult: '',
    error: '',
    img: require(`../../../../../../assets/square/triangle.png`)
  }

  componentDidMount() {
    const { num1, num2, result } = mathCaclulator.getSquareTask()
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

  addErrorMessage = (msg) => {
    this.setState({
      error: msg
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
    const { userResult, error, img, num1, num2 } = this.state
    const { handleChange, checkUserAnswer } = this

    return (
      <div className="square-question-container">
        <h3>Расчитайте площадь треугольника</h3>
        <hr />
        <div>
          <img src={img} />
          <div>
            a = {num1}, b = {num2}
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
)(SquareQuestion)
