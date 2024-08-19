import Background from './src/Background.js'
import { GAME_WIDTH, GAME_HEIGHT } from './src/common/const.js'
import { EventEnum } from './src/common/enum.js'
import { getCanvasAndCtx } from './src/common/utils.js'
import EventManager from './src/Global/EventManager.js'
import { Player } from './src/Player.js'
import spriteAnimationManager from './src/Sprite/SpriteAnimationManager.js'
import spriteManager from './src/Sprite/SpriteManage.js'
import Vector2 from './src/Vector/Vector2.js'
const { canvas, ctx } = getCanvasAndCtx()

class Game {
  /**
   * @type {Player}
   */
  player
  constructor() {
    this.player = new Player({})
    EventManager.on(EventEnum.GameEnd, this.gameEnd, this)
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 11; j++) {
        new Background({
          src: './res/background/5.png',
          position: new Vector2(i * Background.SIZE.x, j * Background.SIZE.y),
        })
      }
    }
    for (let i = 0; i < 20; i++) {
      new Background({
        src: './res/background/1.png',
        position: new Vector2(i * Background.SIZE.x, GAME_HEIGHT - Background.SIZE.y),
      })
    }
  }
  gameEnd(...data) {
    console.log(data)
    // alert(`游戏结束`)
  }
  update(dt) {
    this.player.update(dt)
    spriteManager.update(dt)
    spriteAnimationManager.update(dt)
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    spriteManager.render(ctx)
    spriteAnimationManager.render(ctx)
    this.player.render(ctx)
  }
}
let dt = 16
let lastTime = 0
const game = new Game()
function renderLoop(time = 0) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  dt = time - lastTime
  game.update(dt)
  game.render(ctx)
  requestAnimationFrame(renderLoop)
  lastTime = time
}

renderLoop()
