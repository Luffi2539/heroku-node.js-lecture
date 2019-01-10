import { getResponsiveX, getResponsiveY } from '../../../helpers/calculateResponsiveObjectPos'

class Hero {
  constructor(
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
    context
  ) {
    this.imgName = imgName
    this.imgWidth = imgWidth
    this.imgHeight = imgHeight
    this.hero = null
    this.x = x
    this.y = y
    this.rowWidth = imgWidth
    this.rowHeight = rowHeight
    this.standingRowNum = standingRowNum
    this.standingRowLength = standingRowLength
    this.castingSpellRowNum = castingSpellRowNum
    this.castingSpellRowLength = castingSpellRowLength
    this.dyingRowNum = dyingRowNum
    this.dyingRowLength = dyingRowLength
    this.oneSpriteHeight = oneSpriteHeight
    this.oneSpriteWidth = oneSpriteWidth
    this.currentAnimationPos = 0
    this.currentAtackAnimationPos = 0
    this.context = context
    this.state ={
      type: 'standing',
      rowNum: standingRowNum,
      framesCount: standingRowLength
    }
  }

  draw() {
    this.hero = new Image()
    this.hero.src = require(`../../../assets/${this.imgName}`)

    this.hero.onload = () => {
      this.context.drawImage(
        this.hero,
        this.oneSpriteWidth * this.currentAnimationPos,
        this.oneSpriteHeight * this.state.rowNum,
        this.oneSpriteWidth,
        this.oneSpriteHeight,
        getResponsiveX(innerWidth, this.x),
        getResponsiveY(innerHeight, this.y),
        300,
        300
      )
    }
  }

  update() {
    if (this.state.type === 'dying' && this.currentAnimationPos + 1 === this.state.framesCount) {
      this.context.drawImage(
        this.hero,
        this.oneSpriteWidth * this.currentAnimationPos,
        this.oneSpriteHeight * this.state.rowNum,
        this.oneSpriteWidth,
        this.oneSpriteHeight,
        getResponsiveX(innerWidth, this.x),
        getResponsiveY(innerHeight, this.y),
        300,
        300
      )
      return
    }
    this.incrementCurrentAnimationPos()
    this.context.drawImage(
      this.hero,
      this.oneSpriteWidth * this.currentAnimationPos,
      this.oneSpriteHeight * this.state.rowNum,
      this.oneSpriteWidth,
      this.oneSpriteHeight,
      getResponsiveX(innerWidth, this.x),
      getResponsiveY(innerHeight, this.y),
      300,
      300
    )
  }

  incrementCurrentAnimationPos() {
    if (this.state.type === 'atacking') {
      this.currentAtackAnimationPos += 1

      if (this.currentAtackAnimationPos >= this.state.framesCount) {
        this.currentAtackAnimationPos = 0
        this.state ={
          type: 'standing',
          rowNum: this.standingRowNum,
          framesCount: this.standingRowLength
        }
      }
    }
    if (this.currentAnimationPos + 1 >= this.state.framesCount) {
      this.currentAnimationPos = 0
    } else {
      this.currentAnimationPos += 1
    }
  }

  castSpell() {
    this.state = {
      type: 'atacking',
      rowNum: this.castingSpellRowNum,
      framesCount: this.castingSpellRowLength
    }
  }

  die() {
    this.state = {
      type: 'dying',
      rowNum: this.dyingRowNum,
      framesCount: this.dyingRowLength
    }
  }
}

export default Hero