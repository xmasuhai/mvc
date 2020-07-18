import $ from 'jquery'
import './app1.css'
import Model from './base/Model.js'
import View from './base/View'
// 获取 jQuery对象的 on 和 trigger 方法
const eventBus = $({})
/* 数据相关放到 m */
const m = new Model({
  data: {
    n: parseInt(localStorage.getItem('n')) || 100
  },
  update(data) {
    // 更新数据
    Object.assign(m.data, data)
    // 标记数据更新
    eventBus.trigger('m:updated')
    localStorage.setItem('n', m.data.n.toString())
  }
})
// console.dir(m)
// m.create()
/* 视图相关放到 v */
/* 其他相关放到 c */
const c = {
  v: null,
  initV() {
    c.v = new View({
      // 容器
      el: c.container,
      // 视图
      html: `
        <div>
          <div class="output">
            <span id="number">{{number}}</span>
          </div>
          <div class="actions">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">×2</button>
            <button id="divide2">÷2</button>
            <button id="recovery">恢复</button>
          </div>
        </div>
      `,
      // 渲染
      render(n) {
        if (c.v.el.children.length !== 0) {
          c.v.el.empty()
        }
        $(c.v.html.replace('{{number}}', n))
          .prependTo(c.v.el)
      }
    })
    c.v.render(m.data.n) // 1st view = render(data)
  },
  init(container) {
    c.container = container
    c.initV()
    c.autoBindEvents()
    // 监听触发标记`'m:updated'` 统一渲染
    eventBus.on('m:updated', () => {
      c.v.render(m.data.n)
    })
  },
  events: {
    'click #add1': 'add',
    'click #minus1': 'minus',
    'click #mul2': 'mul',
    'click #divide2': 'div',
    'click #recovery': 'recover',
  },
  add() {
    m.update({n: m.data.n += 1})
  },
  minus() {
    m.update({n: m.data.n -= 1})
  },
  mul() {
    m.update({n: m.data.n *= 2})
  },
  div() {
    m.update({n: m.data.n /= 2})
  },
  recover() {
    m.update({n: m.data.n = 100})
  },
  // 表驱动编程-自动绑定事件
  autoBindEvents() {
    for(let key in c.events) {
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      const valueMethod = c[c.events[key]]
      c.v.el.on(part1, part2, valueMethod)
    }
  }
}
export default c