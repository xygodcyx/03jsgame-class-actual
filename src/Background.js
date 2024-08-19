import Sprite from './Sprite/Sprite.js'
import Vector2 from './Vector/Vector2.js'
export default class Background {
  static SIZE = new Vector2(64, 64)
  /**
   * @type {Sprite}  -
   */
  sprite
  constructor({ src, position = new Vector2(0, 0), autoAddManger = true }) {
    this.autoAddManger = autoAddManger
    this.sprite = new Sprite({ src, position, autoAddManger })
  }
}
