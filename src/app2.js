import './app2.css'
import $ from 'jquery'
import Model from './base/Model'
import View from './base/View'
import EventBus from './base/EventBus'
const localKey = 'app2.index'
// const eventBus = $({})
const eventBus = new EventBus()
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
// 导出初始化方法init(el) 在main.js 中获取el <- #app2
const init = (el) => {
  // let view = new View () 直接 new 不需再赋值 不需变量名 所有this代指对象实例
  new View({
    el: el,
    data: m.data,
    eventBus: eventBus,
    html: (index) => {
      return `
      <div>
        <ol class="tab-bar">
          <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>111111</span></li>
          <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>222222</span></li>
        </ol>
        <ol class="tab-content">
          <li class="${index === 0 ? 'active' : ''}">内容1</li>
          <li class="${index === 1 ? 'active' : ''}">内容2</li>
        </ol>
      </div>
    `
    },
    render(data) {
      // console.log(data)
      const tabIndex = data.index
      if (this.el.children.length !== 0) {
        this.el.empty()
      }
      $(this.html(tabIndex)).appendTo(this.el)
    },
    events: {
      'click .tab-bar li': 'focus'
    },
    focus(e) {
      // console.log(e.currentTarget.dataset.index)
      const tabIndex = parseInt(e.currentTarget.dataset.index)
      // console.log(tabIndex)
      m.update({index: tabIndex})
      // console.log('x')
    },
  })
}
// 导出初始化方法init(el) 在main.js 中获取el <- #app2: y('#app2')
export default init