import SpriteAnimation from './SpriteAnimation.js'
class SpriteAnimationManager {
  /**
   * @type {SpriteAnimation[]}  -
   */
  spriteAnimations = []
  update(dt) {
    this.spriteAnimations.forEach((sn) => (sn.update ? sn.update(dt) : ''))
  }
  render(ctx) {
    this.spriteAnimations.forEach((sn) => sn.render(ctx))
  }
  /**
   * @param {spriteAnimation} spriteAnimation
   */
  add(spriteAnimation) {
    this.spriteAnimations.push(spriteAnimation)
  }
  /**
   * @param {spriteAnimation} spriteAnimation
   */
  delete(spriteAnimation) {
    const index = this.spriteAnimations.indexOf(spriteAnimation)
    if (index !== -1) {
      spriteAnimation.destroy ? spriteAnimation.destroy() : ''
      this.spriteAnimations.splice(index, 1)
    }
  }
  destroy() {
    this.spriteAnimations = []
    this.spriteAnimations.forEach((sn) => (sn.destroy ? sn.destroy() : ''))
  }
}

const spriteAnimationManager = new SpriteAnimationManager()
export default spriteAnimationManager
