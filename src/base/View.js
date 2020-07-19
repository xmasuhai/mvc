import $ from 'jquery'
import EventBus from './EventBus.js'
class View extends EventBus {
  constructor(options) {
    super()
    // options: {el, html, render, data, eventBus, events, methods}
    Object.assign(this, options)
    this.el = $(this.el)
    this.render(this.data)
    this.autoBindEvents()
    this.on('m:updated', () => {
      this.render(this.data)
    })
  }
  autoBindEvents(){
    for(let key in this.events) {
      const value = this[this.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      const valueMethod = this[this.events[key]]
      this.el.on(part1, part2, valueMethod)
    }
  }
}
export default View