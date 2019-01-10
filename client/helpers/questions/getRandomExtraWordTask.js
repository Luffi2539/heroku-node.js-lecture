import extraWordsList from '../../constants/extra-words-list'
import getRandomNumber from '../getRandomNumber'

export default () => {
  return extraWordsList[getRandomNumber(0, extraWordsList.length)]
}