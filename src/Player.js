import { GAME_WIDTH, GAME_HEIGHT, FLOOR_HEIGHT } from './common/const.js'
import { EventEnum, KeyConfig, PlayerEnum } from './common/enum.js'
import EventManager from './Global/EventManager.js'
import { Input } from './Input.js'
import SpriteAnimation from './Sprite/SpriteAnimation.js'
import Vector2 from './Vector/Vector2.js'
export class Player {
  config = {
    idle: {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [3],
      fps: 11,
      loop: true,
    },
    walk: {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      y: [5],
      fps: 12,
      loop: true,
    },
    jump: {
      x: [0],
      y: [4],
      fps: 6,
      loop: false,
    },
    jumpFall: {
      x: [0],
      y: [1],
      fps: 12,
      loop: false,
    },
  }

  speed = 0.5
  /**
   * @type {Vector2}
   */
  position
  /**
   * @param {SpriteAnimation}  -
   */
  anim
  /**
   * @type {Vector2}
   */
  velocity = new Vector2(0, 0)
  gravity = 0.1
  jumpForce = -10
  isGrounded = true
  isGameOver = false
  /**
   * input
   * @type {Input}
   */
  input = new Input()
  isLeft = false
  isRight = false
  dir = 1 /* 1 右 -1 左 0 静止 */
  playerNumber = PlayerEnum.PLAYER_2
  constructor({ src = './res/player/1.png', config = this.config }) {
    this.config = config
    this.anim = new SpriteAnimation({ src, config: this.config })
    this.position = new Vector2(
      0,
      GAME_HEIGHT - FLOOR_HEIGHT - this.anim.size.x * this.anim.scale.x
    )
    this.anim.changeAnimation('idle')
    // document.addEventListener('click', () => {
    //   this.isWalking = true
    //   this.velocity.x = this.speed
    //   this.anim.changeAnimation('walk')
    //   if (this.isGrounded) {
    //     this.velocity.y = this.jumpForce
    //   }
    // })
    EventManager.on(EventEnum.KeyDown, this.handleKeyDown, this)
    EventManager.on(EventEnum.KeyUp, this.handleKeyUp, this)
  }
  handleKeyDown() {
    this.isLeft = this.input.hasKey(KeyConfig.Left, this.playerNumber)
    this.isRight = this.input.hasKey(KeyConfig.Right, this.playerNumber)
  }
  handleKeyUp() {
    this.isLeft = this.input.hasKey(KeyConfig.Left, this.playerNumber)
    this.isRight = this.input.hasKey(KeyConfig.Right, this.playerNumber)
  }

  update(dt) {
    if (!this.anim.imgIsLoaded()) {
      return
    }
    console.log(this.isLeft, this.isRight)
    this.changeDirByKey()
    this.changeAnimationByVelocity()
    this.movement(dt)
    this.judgmentBorder()
    this.jump()
    this.anim.updatePosition(this.position)
  }
  movement(dt) {
    this.position.x += this.speed * dt * this.dir
  }
  judgmentBorder() {
    if (this.position.x < 0) {
      this.position.x = 0
    } else if (this.position.x + this.anim.size.x * this.anim.scale.x > GAME_WIDTH) {
      this.position.x = GAME_WIDTH - this.anim.size.x * this.anim.scale.x
      if (!this.isGameOver) {
        EventManager.emit(EventEnum.GameEnd, '游戏结束啦', '游戏结束啦2')
      }
      this.isGameOver = true
    }
  }
  changeAnimationByVelocity() {
    if (this.velocity.x !== 0) {
      this.anim.changeAnimation('walk')
    } else {
      this.anim.changeAnimation('idle')
    }
    if (this.velocity.x !== 0 && this.isGrounded) {
      this.anim.changeAnimation('walk')
    }
  }
  changeDirByKey() {
    if (this.isLeft && this.isRight) {
      this.dir = 0
      this.velocity.x = 0
    } else if (this.isLeft) {
      this.dir = -1
      this.velocity.x = this.speed
      this.anim.flipX(true)
    } else if (this.isRight) {
      this.dir = 1
      this.velocity.x = this.speed
      this.anim.flipX(false)
    } else {
      this.dir = 0
      this.velocity.x = 0
    }
  }
  jump() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
    this.isGrounded =
      this.position.y + this.anim.size.x * this.anim.scale.x >= GAME_HEIGHT - FLOOR_HEIGHT
    if (this.isGrounded) {
      this.position.y = GAME_HEIGHT - FLOOR_HEIGHT - this.anim.size.x * this.anim.scale.x
      this.velocity.y = 0
    }
    if (this.velocity.y < 0) {
      this.anim.changeAnimation('jump')
    } else if (this.velocity.y > 0) {
      this.anim.changeAnimation('jumpFall')
    }
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    if (!this.anim.imgIsLoaded()) {
      return
    }
  }
}
