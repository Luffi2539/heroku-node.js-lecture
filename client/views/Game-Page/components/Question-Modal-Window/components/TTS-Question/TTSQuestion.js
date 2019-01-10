import React from 'react'
import { connect } from 'react-redux'

import './tts-question.scss'

import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'
import translateHelper from '../../../../../../helpers/questions/Translate-Helper'
import ttsHelper from '../../../../../../helpers/questions/TTS-Helper'

import { setAnswerInfo } from '../../../../../../actions/question-answer'

class TSSQuestion extends React.Component {
  state = {
    userResult: '',
    error: undefined,
    word: undefined,
    ttsHelper: undefined
  }

  componentDidMount() {
    const { word } = translateHelper.getTask()
    ttsHelper.text = word
    this.setState({ word, ttsHelper })
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

  playSound = () => {
    const { ttsHelper } = this.state
    speechSynthesis.speak(ttsHelper)
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
      error: msg
    })
  }

  checkUserAnswer = () => {
    const { word, userResult } = this.state
    const { setAnswerInfo } = this.props
    const { addErrorMessage, playSound } = this

    if (userResult === '') {
      playSound()
      addErrorMessage('Заполните поле')
      return
    }

    if (word.trim().toLowerCase() === userResult.trim().toLowerCase()) {
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
    const { handleChange, checkUserAnswer, playSound } = this
    const { userResult, error } = this.state

    return (
      <div className="tts-question-container">
        <h3>Аудирование</h3>
        <hr />
        <div>
          <img
            src={require('../../../../../../assets/sound-icon.png')}
            onClick={() => playSound()}
          />
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
)(TSSQuestion)
