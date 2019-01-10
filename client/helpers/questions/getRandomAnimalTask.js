import animals from '../../constants/animals'
import getRandomNumber from '../getRandomNumber'

export default () => {
  return animals[getRandomNumber(0, animals.length)]
}