import Sprite from './Sprite.js'
class SpriteManager {
  /**
   * @type {Sprite[]}  -
   */
  sprites = []
  update(dt) {
    this.sprites.forEach((s) => (s.update ? s.update(dt) : ''))
  }
  render(ctx) {
    this.sprites.forEach((s) => s.render(ctx))
  }
  /**
   * @param {Sprite} sprite
   */
  add(sprite) {
    this.sprites.push(sprite)
  }
  /**
   * @param {Sprite} sprite
   */
  delete(sprite) {
    const index = this.sprites.indexOf(sprite)
    if (index !== -1) {
      this.sprites.splice(index, 1)
    }
  }
  destroy() {
    this.sprites = []
    this.sprites.forEach((s) => s?.destroy())
  }
}

const spriteManager = new SpriteManager()
export default spriteManager
