import capitals from '../../constants/capitals'
import getRandomNumber from '../getRandomNumber'

export default () => {
  return capitals[getRandomNumber(0, capitals.length)]
}