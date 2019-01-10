import { getResponsiveX, getResponsiveY } from '../../../helpers/calculateResponsiveObjectPos'

class Spell {
  constructor(
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
    damageOrHealingPoints,
    hero,
    soundName,
    context
  ) {
    this.imgName = imgName
    this.imgWidth = imgWidth
    this.imgHeight = imgHeight
    this.startX = startX
    this.y = y
    this.finishX = finishX
    this.rowWidth = imgWidth
    this.rowHeight = rowHeight
    this.rowNum = rowNum
    this.oneSpriteHeight = oneSpriteHeight
    this.oneSpriteWidth = oneSpriteWidth
    this.scale = scale
    this.currentAnimationPos = 0
    this.framesCount = imgWidth / oneSpriteWidth
    this.context = context
    this.spell = null
    this.currentX
    this.currentY
    this.isSpellCasting = false
    this.healingAnimationTimes = 0
    this.damageOrHealingPoints = damageOrHealingPoints
    this.soundEffect = new Audio(require(`../../../assets/${soundName}`))
    this.hero = hero
  }

  draw() {
    this.spell = new Image()
    this.spell.src = require(`../../../assets/${this.imgName}.png`)
  }

  update() {
    if (this.isSpellCasting) {
      if (this.imgName === 'healing-spell-1') {
        this.spellLoopHealing()
      } else {
        this.spellLoopUsual()
      }
    }
    this.incrementCurrentAnimationPos()
    this.context.drawImage(
      this.spell,
      this.oneSpriteWidth * this.currentAnimationPos,
      this.oneSpriteHeight * this.rowNum,
      this.oneSpriteWidth,
      this.oneSpriteHeight,
      getResponsiveX(innerWidth, this.currentX),
      getResponsiveY(innerHeight, this.y),
      this.scale,
      this.scale
    )
  }

  incrementCurrentAnimationPos() {
    if (this.currentAnimationPos + 1 >= this.framesCount) {
      this.currentAnimationPos = 0
    } else {
      this.currentAnimationPos += 1
    }
  }

  castSpell() {
    this.soundEffect.play()
    this.hero.castSpell()
    this.isSpellCasting = true
    this.currentX = this.startX
    this.currentY = this.y
  }

  getIsSpellCasting() {
    return this.isSpellCasting
  }

  spellLoopUsual() {
    if (this.currentX >= this.finishX) {
      this.isSpellCasting = false
      return
    }
    this.currentX += 50
  }
  
  spellLoopHealing() {
    if (this.healingAnimationTimes >= 12) {
      this.isSpellCasting = false
      this.healingAnimationTimes = 0
    } else {
      this.healingAnimationTimes += 1
    }
  }

  getDamageOrHealingPoints() {
    return this.damageOrHealingPoints
  }
}

export default Spell