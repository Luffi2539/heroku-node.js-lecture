import { getResponsiveX, getResponsiveY } from '../../../helpers/calculateResponsiveObjectPos'

class Monster {
  constructor(
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
    name,
    scale,
    context
  ) {
    this.monster = null
    this.name = name
    this.imgName = imgName
    this.imgWidth = imgWidth
    this.imgHeight = imgHeight
    this.x = x
    this.y = y
    this.currentX = x
    this.currentY = y
    this.finishX = finishX
    this.finishY = finishY
    this.rowHeight = rowHeight
    this.oneSpriteWidth = oneSpriteWidth
    this.oneSpriteHeight = oneSpriteHeight
    this.standingRowNum = standingRowNum
    this.standingRowLength = standingRowLength
    this.movingToHeroRowNum = movingToHeroRowNum
    this.movingToHeroRowLength = movingToHeroRowLength
    this.atackingHeroRowNum = atackingHeroRowNum
    this.atackingHeroRowLength = atackingHeroRowLength
    this.dyingHeroRowNum = dyingHeroRowNum
    this.dyingHeroRowLength = dyingHeroRowLength
    this.context = context
    this.isAtackEnded = false
    this.currentAnimationPos = 0
    this.currentAtackAnimationPos = 0
    this.scale = scale
    this.soundEffect = new Audio(require('../../../assets/sword-atack.mp3'))
    this.state = {
      type: 'standing',
      rowNum: standingRowNum,
      framesCount: standingRowLength
    }
  }

  draw() {
    this.monster = new Image()
    this.monster.src = require(`../../../assets/${this.imgName}.png`)
    
    this.monster.onload = () => {
      this.context.drawImage(
        this.monster,
        this.oneSpriteWidth * this.currentAnimationPos,
        this.oneSpriteHeight * this.state.rowNum,
        this.oneSpriteWidth,
        this.oneSpriteHeight,
        getResponsiveX(innerWidth, this.currentX),
        getResponsiveY(innerHeight, this.currentY),
        this.scale,
        this.scale
      )
    }
  }

  update() {
    if (this.state.type === 'dying' && this.currentAnimationPos + 1 === this.state.framesCount) {
      this.context.drawImage(
        this.monster,
        this.oneSpriteWidth * this.currentAnimationPos,
        this.oneSpriteHeight * this.state.rowNum,
        this.oneSpriteWidth,
        this.oneSpriteHeight,
        getResponsiveX(innerWidth, this.currentX),
        getResponsiveY(innerHeight, this.currentY),
        this.scale,
        this.scale
      )
      return
    }
    if (this.isAtackEnded) {
      this.moveBack()
      this.isAtackEnded = false
    }
    if (this.state.type === 'moving') {
      this.movingLoop()
    } else if (this.state.type === 'moving back') {
      this.movingLoopBack()
    }

    this.incrementCurrentAnimationPos()
    this.context.drawImage(
      this.monster,
      this.oneSpriteWidth * this.currentAnimationPos,
      this.oneSpriteHeight * this.state.rowNum,
      this.oneSpriteWidth,
      this.oneSpriteHeight,
      getResponsiveX(innerWidth, this.currentX),
      getResponsiveY(innerHeight, this.currentY),
      this.scale,
      this.scale
    )
  }

  incrementCurrentAnimationPos() {
    if (this.state.type === 'atacking') {
      this.currentAtackAnimationPos += 1

      if (this.currentAtackAnimationPos >= this.state.framesCount) {
        this.isAtackEnded = true
        this.currentAtackAnimationPos = 0
      }
    }
    if (this.currentAnimationPos + 1 >= this.state.framesCount) {
      this.currentAnimationPos = 0
    } else {
      this.currentAnimationPos += 1
    }
  }

  moveTowardHero() {
    this.state = {
      type: 'moving',
      rowNum: this.movingToHeroRowNum,
      framesCount: this.movingToHeroRowLength
    }
    this.currentX = this.x
    this.currentY = this.y
  }

  moveBack() {
    this.state = {
      type: 'moving back',
      rowNum: this.movingToHeroRowNum,
      framesCount: this.movingToHeroRowLength
    }
  }

  movingLoop() {
    if (this.currentX <= this.finishX) {
      this.state = {
        type: 'atacking',
        rowNum: this.atackingHeroRowNum,
        framesCount: this.atackingHeroRowLength
      }
      this.soundEffect.play()
      return
    }
    this.currentX -= 50
  }

  movingLoopBack() {
    if (this.currentX >= this.x) {
      this.state = {
        type: 'standing',
        rowNum: this.standingRowNum,
        framesCount: this.standingRowLength
      }
      return
    }
    this.currentX += 50
  }

  atackHero() {
    this.moveTowardHero()
  }

  die() {
    this.state = {
      type: 'dying',
      rowNum: this.dyingHeroRowNum,
      framesCount: this.dyingHeroRowLength
    }
  }
}

export default Monster
