import React from 'react'
import { connect } from 'react-redux'

import './car-marks-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import { setAnswerInfo } from '../../../../../../actions/question-answer'
import getRandomCarMarksTask from '../../../../../../helpers/questions/getRandomCarMarksTask'

class CarMarksQuestion extends React.Component {
  state = {
    error: '',
    userResult: '',
    img: undefined,
    result: undefined
  }

  componentDidMount() {
    const { result, imgName } = getRandomCarMarksTask()
    this.setState({
      result,
      img: require(`../../../../../../assets/car-marks/${imgName}`)
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

    if (userResult.trim().toLowerCase() === result.trim().toLowerCase()) {
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
    const { error, userResult, img } = this.state

    return (
      <div className="car-marks-question-container">
        <h3>Назовите марку машины (на английском)</h3>
        <hr />
        <div>
          <div>
            <img src={img} />
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
)(CarMarksQuestion)
