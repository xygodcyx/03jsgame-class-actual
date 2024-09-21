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
  isFlipX = false
  isFlipY = false
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
    ctx.save()
    var modifierX = this.isFlipX ? -1 : 1
    var modifierY = this.isFlipY ? -1 : 1
    ctx.scale(modifierX, modifierY)
    ctx.drawImage(
      this.img.img,
      this.curFrame * this.size.x,
      this.curRow * this.size.y,
      this.size.x,
      this.size.y,
      this.position.x * modifierX,
      this.position.y * modifierY,
      this.size.x * this.scale.x * modifierX,
      this.size.y * this.scale.y * modifierY
    )
    ctx.restore()
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
    this.animationTimer += dt
    if (this.animationTimer >= this.animationInterval) {
      this.isAnimationChanged = false //明天讲解点,要等下一个动画播放了至少一帧后才可以重置这个变量
      const temp = this.config[this.currentAnimation]
      this.curMinX = temp.x[0]
      this.curMaxX = temp.x[temp.x.length - 1]
      this.curRow = temp.y[0]
      this.curFrame = Math.max((this.curFrame + 1) % (this.curMaxX + 1), this.curMinX)
      this.animationInterval = 1000 / temp.fps
      this.animationTimer = 0
    }
  }
  flipX(isFlipX) {
    this.isFlipX = isFlipX
  }
  flipY(isFlipY) {
    this.isFlipY = isFlipY
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
    if (name === this.currentAnimation) {
      return
    }
    //明天讲解点,切换时机问题
    this.currentAnimation = name
    this.isAnimationChanged = true
  }
}
