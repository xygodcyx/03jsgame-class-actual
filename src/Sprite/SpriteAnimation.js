import Img from './Img.js'
import Vector2 from '../Vector/Vector2.js'
import spriteAnimationManager from './SpriteAnimationManager.js'
export default class SpriteAnimation {
  /**
   * @type {Img}
   */
  img
  /**
   * @type {object} config - 动画的配置,在初始化的时候传入
   */
  config

  /**
   * @type {Vector2}
   */
  size = new Vector2(32, 32)
  /**
   * @type {Vector2}
   */
  position = new Vector2(0, 0)
  /**
   * @type {Vector2}
   */
  scale = new Vector2(2, 2)
  curFrame = 0
  curMinX = 0
  curMaxX = Infinity
  curRow = 0
  currentAnimation = 'idle'
  animationInterval
  animationTimer = 0
  isAnimationChanged = false
  constructor({ src = './res/player/1.png', config, autoAddManger = true }) {
    this.img = new Img(src)
    this.config = config
    this.animationInterval = 1000 / this.config[this.currentAnimation].fps
    if (autoAddManger) {
      spriteAnimationManager.add(this)
    }
  }
  update(dt) {
    this.animation(dt)
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.drawImage(
      this.img.img,
      this.curFrame * this.size.x,
      this.curRow * this.size.y,
      this.size.x,
      this.size.y,
      this.position.x,
      this.position.y,
      this.size.x * this.scale.x,
      this.size.y * this.scale.y
    )
  }

  animation(dt) {
    if (
      this.curFrame === this.curMaxX &&
      !this.config[this.currentAnimation].loop &&
      !this.isAnimationChanged
    ) {
      this.curFrame = this.curMaxX
      return
    }
    this.isAnimationChanged = false
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
  imgIsLoaded() {
    return this.img.isLoaded
  }
  /**
   * @param {Vector2} position
   */
  updatePosition(position) {
    this.position.x = position.x
    this.position.y = position.y
  }
  changeAnimation(name) {
    if (this.currentAnimation !== name) {
      this.currentAnimation = name
      this.isAnimationChanged = true
    }
  }
}
