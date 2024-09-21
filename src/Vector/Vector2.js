export default class Vector2 {
  x = 0
  y = 0
  static ZERO = new Vector2(0, 0)
  static ONE = new Vector2(1, 1)
  static UP = new Vector2(0, -1)
  static DOWN = new Vector2(0, 1)
  static LEFT = new Vector2(-1, 0)
  static RIGHT = new Vector2(1, 0)
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  /**
   * @param {Vector2} v
   * @returns {Vector2}
   */
  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }
  distance(v) {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2)
  }
  distanceSquared(v) {
    return (this.x - v.x) ** 2 + (this.y - v.y) ** 2
  }
}
