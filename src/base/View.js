import $ from 'jquery'
import EventBus from './EventBus.js'
class View extends EventBus {
  constructor(options) {
    super()
    // 将 options 的所有属性 复制到 this 上
    Object.assign(this, options) // {el, html, render, data, eventBus, events, methods}
    this.el = $(this.el)
    // console.log(this.data)
    this.render(this.data)
    this.autoBindEvents()
    // this.eventBus.on
    this.on('m:updated', () => {
      this.render(this.data)
    })
  }
  autoBindEvents(){
    // console.log('here')
    // console.log(this.events)
    for(let key in this.events) {
      const value = this[this.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      const valueMethod = this[this.events[key]]
      // console.log(part1, part2, valueMethod)
      this.el.on(part1, part2, valueMethod)
    }
  }
}
export default View