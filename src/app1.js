import $ from 'jquery'
import './app1.css'
// 获取 jQuery对象的 on 和 trigger 方法
const eventBus = $({})
/* 数据相关放到 m */
const m = {
  // 初始化数据
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
}
/* 视图相关放到 v */
const v = {
  // 容器
  el: null,
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
  // 接受外部参数（传入容器）视图初始化
  init(container) {
    // 用jQuery封装容器 container <- #app1节点
    v.el = $(container)
  },
  // 渲染
  render(n) {
    if (v.el.children.length !== 0) {
      v.el.empty()
    }
    $(v.html.replace('{{number}}', n))
      .prependTo(v.el)
  }
}
/* 其他相关放到 c */
const c = {
  init(container) {
    // 初始化渲染html
    v.init(container)
    v.render(m.data.n) // 1st view = render(data)
    c.autoBindEvents()
    // 监听触发标记`'m:updated'` 统一渲染
    eventBus.on('m:updated', () => {
      v.render(m.data.n)
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
      v.el.on(part1, part2, valueMethod)
    }
  }
}
export default c