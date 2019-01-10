import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import './extra-word-question.scss'

import {
  KEY_ENTER_CODE,
  KEY_1_CODE,
  KEY_2_CODE,
  KEY_3_CODE,
  KEY_4_CODE
} from '../../../../../../constants/keyCodes'
import { setAnswerInfo } from '../../../../../../actions/question-answer'

import getRandomExtraWordTask from '../../../../../../helpers/questions/getRandomExtraWordTask'

class ExtraWordQuestion extends React.Component {
  state = {
    error: '',
    userResult: '',
    choosedOptionId: undefined,
    words: [],
    result: undefined
  }

  componentDidMount() {
    const { words, result } = getRandomExtraWordTask()
    this.setState({
      words,
      result
    })
    window.addEventListener('keypress', this.handlePress)
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handlePress)
  }

  handleChange = (id) => {
    this.addErrorMessage('')
    this.setState((state) => ({
      choosedOptionId: id,
      userResult: state.words[id]
    }))
  }

  handlePress = (e) => {
    if (KEY_ENTER_CODE === e.keyCode) {
      this.checkUserAnswer()
    } else if (KEY_1_CODE === e.keyCode) {
      this.addErrorMessage('')
      this.setState((state) => ({
        choosedOptionId: 0,
        userResult: state.words[0]
      }))
    } else if (KEY_2_CODE === e.keyCode) {
      this.addErrorMessage('')
      this.setState((state) => ({
        choosedOptionId: 1,
        userResult: state.words[1]
      }))
    } else if (KEY_3_CODE === e.keyCode) {
      this.addErrorMessage('')
      this.setState((state) => ({
        choosedOptionId: 2,
        userResult: state.words[2]
      }))
    } else if (KEY_4_CODE === e.keyCode) {
      this.addErrorMessage('')
      this.setState((state) => ({
        choosedOptionId: 3,
        userResult: state.words[3]
      }))
    }
  }

  addErrorMessage = (msg) => {
    this.setState({
      error: msg
    })
  }

  checkUserAnswer = () => {
    const { addErrorMessage } = this
    const { userResult, result } = this.state
    const { setAnswerInfo } = this.props

    if (userResult === '') {
      addErrorMessage('Сделайте выбор')
      return
    }

    if (userResult === result) {
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
    const { checkUserAnswer, handleChange } = this
    const { error, words, choosedOptionId } = this.state

    return (
      <div className="extra-word-question-container">
        <h3>Выберите лишнее слово</h3>
        <hr />
        <div>
          <div>
            {words.map((word, id) => {
              return (
                <span
                  key={id}
                  onClick={() => handleChange(id)}
                  className={cx({ 'choosed-option': choosedOptionId === id })}
                >
                  {word}
                </span>
              )
            })}
          </div>
        </div>
        {error && <span className="error-message">{error}</span>}
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
)(ExtraWordQuestion)
