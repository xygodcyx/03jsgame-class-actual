/**
 * @typedef {Object} Item
 * @property {Function} cb  - 回调函数
 * @property {any} ctx  - 上下文
 */

export default class EventManager {
  /**
   * @type {Map<string,Item[]>}
   */
  static map = new Map()
  static emit(name, ...data) {
    if (!this.map.has(name)) {
      console.trace(`[触发错误],事件${name}不存在`)
      return
    }
    const items = this.map.get(name)
    items.forEach(({ cb, ctx }) => {
      cb.apply(ctx, data)
    })
  }
  static on(name, cb, ctx) {
    if (!this.map.has(name)) {
      this.map.set(name, [{ cb, ctx }])
    } else {
      this.map.get(name).push({ cb, ctx })
    }
  }
  static off(name, cb, ctx) {
    if (!this.map.has(name)) {
      console.trace(`[解绑错误],事件${name}不存在`)
      return
    }
    const items = this.map.get(name)
    const index = items.findIndex((i) => i.cb === cb && i.ctx === ctx)
    items.splice(index, 1)
  }
  static clear(name) {
    if (!this.map.has(name)) {
      console.trace(`[清除错误],事件${name}不存在`)
      return
    }
    this.map.delete(name)
  }
  static clearAll() {
    this.map.clear()
  }
}
