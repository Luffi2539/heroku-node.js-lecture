import React from 'react'
import { connect } from 'react-redux'

import './translate-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import translateHelper from '../../../../../../helpers/questions/Translate-Helper'
import { setAnswerInfo } from '../../../../../../actions/question-answer'

class TranslateQuestion extends React.Component {
  state = {
    word: undefined,
    translations: [],
    userResult: '',
    error: ''
  }

  componentDidMount() {
    const { word, translations } = translateHelper.getTask()
    this.setState(() => {
      return {
        word,
        translations
      }
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
    const { translations, userResult } = this.state
    const { setAnswerInfo } = this.props

    if (userResult === '') {
      addErrorMessage('Заполните поле')
      return
    }

    if (translations.findIndex((option) => option.trim().toLowerCase() === userResult.trim().toLowerCase()) !== -1) {
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
    const { userResult, word, error } = this.state

    return (
      <div className="translate-question-container">
        <h3>Каков перевод слова?</h3>
        <hr />
        <div>
          <div>{word}</div>
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
)(TranslateQuestion)
