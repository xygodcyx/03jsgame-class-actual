import { GAME_WIDTH, GAME_HEIGHT } from './const.js'

export function getCanvasAndCtx(id = 'game') {
  /**
   * @type {HTMLCanvasElement}  -
   */
  const canvas = document.getElementById(id)
  canvas.width = GAME_WIDTH
  canvas.height = GAME_HEIGHT
  /**
   * @type {CanvasRenderingContext2D}  -
   */
  const ctx = canvas.getContext('2d')
  return { canvas, ctx }
}
