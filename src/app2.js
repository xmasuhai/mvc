import './app2.css'
import $ from 'jquery'
import Model from './base/Model'
const localKey = 'app2.index'
const eventBus = $({})

const m = new Model({
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem(localKey, m.data.index.toString())
  }
})
const view = {
  el: null,
  html: (index) => {
    return `
      <div>
        <ol class="tab-bar">
          <li class="${index === 0? 'selected' : ''}" data-index="0"><span>111111</span></li>
          <li class="${index === 1? 'selected' : ''}" data-index="1"><span>222222</span></li>
        </ol>
        <ol class="tab-content">
          <li class="${index === 0 ? 'active' : '' }">内容1</li>
          <li class="${index === 1 ? 'active' : '' }">内容2</li>
        </ol>
      </div>
    `
  },
  render(index) {
    if (view.el.children.length !== 0) {
      view.el.empty()
    }
    $(view.html(index)).appendTo(view.el)
  },
  init(container) {
    view.el = $(container)
    view.render(m.data.index)
    view.autoBindEvents()
    eventBus.on('m:updated', () => {
      view.render(m.data.index)
    })
  },
  events: {
    'click .tab-bar li': 'focus'
  },
  focus(e) {
    // console.log(e.currentTarget.dataset.index)
    const tabIndex = parseInt(e.currentTarget.dataset.index)
    m.update({index: tabIndex})
    // console.log('x')
  },
  autoBindEvents() {
    for(let key in view.events) {
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      const valueMethod = view[view.events[key]]
      view.el.on(part1, part2, valueMethod)
    }
  }
}
export default view