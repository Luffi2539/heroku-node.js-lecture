class Background {
  constructor(imgName, context) {
    this.imgName = imgName
    this.background = null
    this.context = context
  }

  draw() {
    this.background = new Image()
    this.background.src = require(`../../../assets/${this.imgName}`)
    

    this.background.onload = () => {
      this.context.drawImage(this.background, 0, 0, innerWidth, innerHeight)
    }
  }

  update() {
    this.context.drawImage(this.background, 0, 0, innerWidth, innerHeight)
  }
}

export default Background