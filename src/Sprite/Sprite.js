import Img from './Img.js'
import Vector2 from '../Vector/Vector2.js'
import spriteManager from './SpriteManage.js'
export default class Sprite {
  /**
   * @type {Img}  -
   */
  img
  /**
   * @type {Vector2}
   */
  size = new Vector2(64, 64)
  /**
   * @type {Vector2}
   */
  position = new Vector2(0, 0)
  /**
   * @type {Vector2}
   */
  scale = new Vector2(1, 1)
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  /**
   * @type {Vector2}
   */
  offset = new Vector2(0, 0)
  constructor({
    src,
    position = new Vector2(0, 0),
    offset = new Vector2(0, 0),
    autoAddManger = true,
  }) {
    this.img = new Img(src)
    this.position = position
    this.offset = offset
    if (autoAddManger) {
      spriteManager.add(this)
    }
  }
  render(ctx) {
    if (!this.img.isLoaded) {
      return
    }
    ctx.drawImage(
      this.img.img,
      this.offset.x * this.size.x,
      this.offset.y * this.size.y,
      this.size.x,
      this.size.y,
      this.position.x,
      this.position.y,
      this.size.x * this.scale.x,
      this.size.y * this.scale.y
    )
  }
}
