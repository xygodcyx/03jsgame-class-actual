/**
 * @type {HTMLCanvasElement}  -
 */
const canvas = document.getElementById('game')
const WIDTH = (canvas.width = 1280)
const HEIGHT = (canvas.height = 720)
/**
 * @type {CanvasRenderingContext2D}  -
 */
const ctx = canvas.getContext('2d')
class Player {
  img = new Image()

  x = 0
  isLoaded = false
  speed = 0.1
  config = {
    idle: {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [3],
      fps: 11,
      loop: true,
    },
    walk: {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      y: [5],
      fps: 12,
      loop: true,
    },
  }
  size = {
    x: 32,
    y: 32,
  }
  curFrame = 0
  curMinX = 0
  curMaxX = Infinity
  curRow = 0
  currentAnimation = 'idle'
  animationInterval = 1000 / this.config[this.currentAnimation].fps
  animationTimer = 0
  isWalking = false
  constructor() {
    this.img.src = './res/1.png'
    this.img.onload = () => {
      this.isLoaded = true
      document.addEventListener('click', () => {
        this.isWalking = true
        this.currentAnimation = 'walk'
      })
    }
  }
  update(dt) {
    this.animation(dt)
    if (this.isWalking) {
      this.x += this.speed * dt
    }
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    if (!this.isLoaded) {
      return
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.drawImage(
      this.img,
      this.curFrame * this.size.x,
      this.curRow * this.size.y,
      this.size.x,
      this.size.y,
      this.x,
      0,
      this.size.x * 3,
      this.size.y * 3
    )
  }
  animation(dt) {
    if (this.curFrame === this.curMaxX && !this.config[this.currentAnimation].loop) {
      this.curFrame = this.curMaxX
      return
    }
    this.animationTimer += dt
    if (this.animationTimer >= this.animationInterval) {
      const temp = this.config[this.currentAnimation]
      this.curMinX = temp.x[0]
      this.curMaxX = temp.x[temp.x.length - 1]
      this.curRow = temp.y[0]
      this.curFrame = Math.max((this.curFrame + 1) % (this.curMaxX + 1), this.curMinX)
      this.animationInterval = 1000 / temp.fps
      this.animationTimer = 0
    }
  }
}

class Game {
  /**
   * @type {Player}
   */
  player
  constructor() {
    this.player = new Player()
  }
  update(dt) {
    this.player.update(dt)
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    this.player.render(ctx)
  }
}
let dt = 16
let lastTime = 0
const game = new Game()
function renderLoop(time = 0) {
  dt = time - lastTime
  game.update(dt)
  game.render(ctx)
  requestAnimationFrame(renderLoop)
  lastTime = time
}

renderLoop()
