import Hero from './classes/Hero'
import Background from './classes/Background'
import Monster from './classes/Monster'
import Spell from './classes/Spell'

import monstersInfo from '../../constants/monstersInfo'
import spellsInfo from '../../constants/spellsInfo'
import getRandomMonsterName from './getRandomMonsterName'
import getRandomNumber from '../getRandomNumber'

export function initBackground(canvasContext) {
  const imgName = 'header-background.png'

  return new Background(imgName, canvasContext)
}

export function initHero(canvasContext) {
  const imgName = 'hero.png'
  const imgWidth = 416
  const imgHeight = 504
  const x = 350
  const y = 550
  const rowHeight = 31.5
  const standingRowNum = 0
  const standingRowLength = 13
  const castingSpellRowNum = 3
  const castingSpellRowLength = 10
  const dyingRowNum = 15
  const dyingRowLength = 7
  const oneSpriteWidth = 32
  const oneSpriteHeight = 32

  return new Hero(
    imgName,
    imgWidth,
    imgHeight,
    x,
    y,
    rowHeight,
    standingRowNum,
    standingRowLength,
    castingSpellRowNum,
    castingSpellRowLength,
    dyingRowNum,
    dyingRowLength,
    oneSpriteWidth,
    oneSpriteHeight,
    canvasContext
  )
}

export function initMonster(canvasContext) {
  const monsterInfo = monstersInfo[getRandomNumber(0, monstersInfo.length)]
  const {
    imgName,
    imgWidth,
    imgHeight,
    x,
    y,
    rowHeight,
    oneSpriteWidth,
    oneSpriteHeight,
    standingRowNum,
    standingRowLength,
    movingToHeroRowNum,
    movingToHeroRowLength,
    atackingHeroRowNum,
    atackingHeroRowLength,
    dyingHeroRowNum,
    dyingHeroRowLength,
    scale
  } = monsterInfo
  const finishX = 450
  const finishY = 550 

  return new Monster(
    imgName,
    imgWidth,
    imgHeight,
    x,
    y,
    finishX,
    finishY,
    rowHeight,
    oneSpriteWidth,
    oneSpriteHeight,
    standingRowNum,
    standingRowLength,
    movingToHeroRowNum,
    movingToHeroRowLength,
    atackingHeroRowNum,
    atackingHeroRowLength,
    dyingHeroRowNum,
    dyingHeroRowLength,
    getRandomMonsterName(),
    scale,
    canvasContext
  )
}

export function initFireSpell(hero, canvasContext) {
  const {
    imgName,
    imgWidth,
    imgHeight,
    startX,
    y,
    finishX,
    rowHeight,
    rowNum,
    oneSpriteWidth,
    oneSpriteHeight,
    scale,
    damagePoints,
    soundName
  } = spellsInfo[0]
  return new Spell(
    imgName,
    imgWidth,
    imgHeight,
    startX,
    y,
    finishX,
    rowHeight,
    rowNum,
    oneSpriteWidth,
    oneSpriteHeight,
    scale,
    damagePoints,
    hero,
    soundName,
    canvasContext
  )
}

export function initHealingSpell(hero, canvasContext) {
  const {
    imgName,
    imgWidth,
    imgHeight,
    startX,
    y,
    finishX,
    rowHeight,
    rowNum,
    oneSpriteWidth,
    oneSpriteHeight,
    scale,
    healingPoints,
    soundName
  } = spellsInfo[1]
  return new Spell(
    imgName,
    imgWidth,
    imgHeight,
    startX,
    y,
    finishX,
    rowHeight,
    rowNum,
    oneSpriteWidth,
    oneSpriteHeight,
    scale,
    healingPoints,
    hero,
    soundName,
    canvasContext
  )
}

export function initIceSpell(hero, canvasContext) {
  const {
    imgName,
    imgWidth,
    imgHeight,
    startX,
    y,
    finishX,
    rowHeight,
    rowNum,
    oneSpriteWidth,
    oneSpriteHeight,
    damagePoints,
    soundName,
    scale
  } = spellsInfo[2]
  return new Spell(
    imgName,
    imgWidth,
    imgHeight,
    startX,
    y,
    finishX,
    rowHeight,
    rowNum,
    oneSpriteWidth,
    oneSpriteHeight,
    scale,
    damagePoints,
    hero,
    soundName,
    canvasContext
  )
}

export function initLightingSpell(hero, canvasContext) {
  const {
    imgName,
    imgWidth,
    imgHeight,
    startX,
    y,
    finishX,
    rowHeight,
    rowNum,
    oneSpriteWidth,
    oneSpriteHeight,
    scale,
    soundName,
    damagePoints
  } = spellsInfo[3]
  return new Spell(
    imgName,
    imgWidth,
    imgHeight,
    startX,
    y,
    finishX,
    rowHeight,
    rowNum,
    oneSpriteWidth,
    oneSpriteHeight,
    scale,
    damagePoints,
    hero,
    soundName,
    canvasContext
  )
}

