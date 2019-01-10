import nameParts from '../../constants/monsters-name'
import getRandomNumber from '../getRandomNumber'

const { firstNameParts, secondNameParts, thirdNameParts } = nameParts

export default function() {
  let firstPart = firstNameParts[getRandomNumber(0, firstNameParts.length)]
  let secondPart = secondNameParts[getRandomNumber(0, secondNameParts.length)]
  let thirdPart = thirdNameParts[getRandomNumber(0, thirdNameParts.length)]

  return `${firstPart} ${secondPart} ${thirdPart}`
}