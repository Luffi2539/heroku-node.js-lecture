import React from 'react'
import { connect } from 'react-redux'

import './balloon-burst-question.scss'
import BalloonWord from './components/Balloon-Word'

import translateHelper from '../../../../../../helpers/questions/Translate-Helper'
import { KEY_ENTER_CODE } from '../../../../../../constants/keyCodes'

import { setAnswerInfo } from '../../../../../../actions/question-answer'

class BalloonBurstQuestion extends React.Component {
  state = {
    words: [],
    userInputs: new Array(4).fill('')
  }

  componentDidMount() {
    const words = translateHelper.getBalloonBurstTask()
    this.setState({ words })
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

  handleChange = (e, id) => {
    e.persist()
    const wordsCopy = [...this.state.userInputs]
    wordsCopy.splice(id, 1, e.target.value)
    this.setState({ userInputs: wordsCopy })
  }

  checkUserAnswer = () => {
    const { userInputs, words } = this.state
    const { setAnswerInfo } = this.props
    let areUserInputsRight = true

    userInputs.map((input, id) => {
      if (input.trim().toLowerCase() !== words[id].word) {
        areUserInputsRight = false
      }
    })

    if (areUserInputsRight) {
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
    const { words, userInputs } = this.state

    return (
      <div className="balloon-burst-question-container">
        <h3>Назовите слова по картинкам (in english)</h3>
        <hr/>
        <div className="ballons-container">
          {words.map((word, id) => {
            return (<BalloonWord
              key={id}
              id={id}
              imgName={word.imgName}
              userInput={userInputs[id]}
              handleChange={(e, id) => handleChange(e, id)}
            />)
          })}
        </div>
        <hr/>
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

export default connect(null, mapDispatchToProps)(BalloonBurstQuestion)