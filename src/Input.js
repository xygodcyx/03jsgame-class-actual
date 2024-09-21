import { EventEnum, KeyConfig, PlayerEnum } from './common/enum.js'
import EventManager from './Global/EventManager.js'

export class Input {
  activeInputs = []
  keyMap = {
    Left: [
      {
        who: PlayerEnum.PLAYER_1,
        key: 'a',
      },
      {
        who: PlayerEnum.PLAYER_2,
        key: 'ArrowLeft',
      },
    ],
    Right: [
      {
        who: PlayerEnum.PLAYER_1,
        key: 'd',
      },
      {
        who: PlayerEnum.PLAYER_2,
        key: 'ArrowRight',
      },
    ],
  }
  constructor() {
    window.addEventListener('keydown', (e) => {
      this.addKey(KeyConfig.Left, e.key)
      this.addKey(KeyConfig.Right, e.key)
      EventManager.emit(EventEnum.KeyDown)
    })
    window.addEventListener('keyup', (e) => {
      this.removeKey(KeyConfig.Left, e.key)
      this.removeKey(KeyConfig.Right, e.key)
      EventManager.emit(EventEnum.KeyUp)
    })
    window.addEventListener('blur', () => {
      this.clear()
      EventManager.emit(EventEnum.KeyUp)
      console.log('blur')
    })
  }

  clear() {
    this.activeInputs = []
  }
  addKey(wantAddKey, key = this.keyMap[wantAddKey][0].key) {
    if (!this.judgmentExistMap(wantAddKey, key)) return
    if (!this.judgmentExist(key)) {
      this.activeInputs.push(key)
    }
  }
  removeKey(wantRemoveKey, key = this.keyMap[wantRemoveKey][0].key) {
    if (!this.judgmentExistMap(wantRemoveKey, key)) return
    if (this.judgmentExist(key)) {
      this.activeInputs.splice(this.getKeyIndex(key), 1)
    }
  }
  getKeyIndex(key) {
    return this.activeInputs.findIndex((k) => k === key)
  }
  judgmentExist(key) {
    return this.getKeyIndex(key) !== -1 ? true : false
  }
  judgmentExistMap(mapKey, judgmentKey) {
    return this.keyMap[mapKey].findIndex((k) => k.key === judgmentKey) !== -1 ? true : false
  }

  hasKey(key, playerNumber) {
    return this.keyMap[key]
      .filter((k) => k.who === playerNumber)
      .map((k) => k.key)
      .some((v) => this.judgmentExist(v))
  }
}
