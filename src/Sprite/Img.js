export default class Img {
  /**
   * @type {HTMLImageElement}  -
   */
  img = new Image()
  isLoaded = false
  constructor(src) {
    this.img.src = src
    this.img.onload = () => {
      this.isLoaded = true
    }
  }
}
