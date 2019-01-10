import carMarks from '../../constants/car-marks'
import getRandomNumber from '../getRandomNumber'

export default () => {
  return carMarks[getRandomNumber(0, carMarks.length)]
}