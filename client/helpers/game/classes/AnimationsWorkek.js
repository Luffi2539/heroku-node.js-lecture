import Spell from './Spell'

class AnimationWorker {
  constructor() {
    this.context = null
    this.gameObjects = []

    // variables for fps animation logic
    this.fps = 15
    this.fpsInterval
    this.startTime
    this.now
    this.then
    this.elapsedTime
  }

  init() {
    this.gameObjects.forEach((gameObject) => {
      gameObject.draw()
    })
  }
  
  setGameObjects(...gameObjects) {
    this.context = document.getElementById('game-canvas').getContext('2d')
    this.gameObjects = gameObjects
  }

  startAnimating() {
    this.fpsInterval = 1000 / this.fps
    this.then = Date.now()
    this.startTime = this.then
    this.animate()
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    // calc elapsed time since last loop
    this.now = Date.now()
    this.elapsedTime = this.now - this.then

    // if enough time has elapsed, draw the next frame
    if (this.elapsedTime > this.fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      this.then = this.now - (this.elapsedTime % this.fpsInterval)

      this.context.clearRect(0, 0, innerWidth, innerHeight)
      this.gameObjects.forEach((gameObject) => {
        if (gameObject instanceof Spell) {
          if (gameObject.getIsSpellCasting()) {
            gameObject.update()
          }
        } else {
          gameObject.update()
        }
      })
    }
  }
}

const animationWorker = new AnimationWorker()

export default animationWorker
