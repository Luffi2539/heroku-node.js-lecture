import React from 'react'
import { connect } from 'react-redux'

import './capital-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import { setAnswerInfo } from '../../../../../../actions/question-answer'
import getRandomCapitalsTask from '../../../../../../helpers/questions/getRandomCapitalsTask'

class CapitalsQuestion extends React.Component {
  state = {
    error: '',
    userResult: '',
    result: undefined,
    country: undefined
  }

  componentDidMount() {
    const { country, result } = getRandomCapitalsTask()
    this.setState({
      country,
      result
    })
    document.getElementById('answer-input').select()
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

  addErrorMessage = (msg) => {
    this.setState({
      error: msg
    })
  }

  render() {
    const { handleChange, checkUserAnswer } = this
    const { userResult, error, country } = this.state

    return (
      <div className="capitals-question-container">
        <h3>Назовите столицу данной страны</h3>
        <hr />
        <div>
          <div>
            {country}
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

export default connect(null, mapDispatchToProps)(CapitalsQuestion)