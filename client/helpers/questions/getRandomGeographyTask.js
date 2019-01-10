import countriesFlags from '../../constants/countries-flags'
import getRandomNumber from '../getRandomNumber'

export default () => {
  return countriesFlags[getRandomNumber(0, countriesFlags.length)]
}