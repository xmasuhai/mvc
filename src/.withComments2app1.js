/*
import $ from 'jquery'
import './app1.css'
import Model from './base/Model.js'
import View from './base/View.js'
// import EventBus from './base/EventBus.js'
// 获取 jQuery对象的 on 和 trigger 方法
// const eventBus = $({}) // 抽成类
// const eventBus = new EventBus()
/!* 数据相关放到 m *!/
const m = new Model({
  data: {
    n: parseFloat(localStorage.getItem('n')) || 100
  },
  update(data) {
    // 更新数据
    Object.assign(m.data, data)
    // 标记数据更新
    m.trigger('m:updated')
    localStorage.setItem('n', m.data.n.toString())
  }
})

/!* 合并 vc *!/
const init = (el) => {
  // const view =
  new View ({ // {el, html, render, data, eventBus, events, methods}
    // 容器
    el: el,
    data: m.data,
    // eventBus: eventBus,
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
    render(data) {
      const n = data.n
      if (this.el.children.length !== 0) {
        this.el.empty()
      }
      $(this.html.replace('{{number}}', n))
        .prependTo(this.el)
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
    }
  })
}
export default init
*/
