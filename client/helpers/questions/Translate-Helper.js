import getRandomNumber from '../getRandomNumber'
import words from '../../constants/eng-ru-words'

class TranslateHelper {
  constructor(words) {
    this.words = words
    this.wordObj
  }

  getTask() {
    this.setRandomWord()
    return {
      ...this.wordObj
    }
  }

  getBalloonBurstTask() {
    const wordsToReturn = []

    while (wordsToReturn.length <= 3) {
      this.setRandomWord()
      if (wordsToReturn.indexOf(this.wordObj) === -1) {
        wordsToReturn.push(this.wordObj)
      }
    }
    return wordsToReturn
  }

  setRandomWord() {
    const randomWordId = getRandomNumber(0, this.words.length)
    this.wordObj = this.words[randomWordId]
  }
}

const translateHelper = new TranslateHelper(words)

export default translateHelper