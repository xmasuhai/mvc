import $ from 'jquery'
import './app1.css'

// const eventBus = $(window)
const eventBus = $({})
// console.log(eventBus)
// console.log(eventBus.on)
// console.log(eventBus.trigger)
/* 数据相关放到 m */
const m = {
  // 初始化数据
  data: {
    n: parseInt(localStorage.getItem('n')) || 100
  },
  create() {},
  delete() {},
  update(data) {
    // 同名属性覆盖 赋值
    // 监听 n 变化，直接更新数据，不关心视图
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
  },
  get() {}
}
/* 视图相关放到 v */
const v = {
  // 视图元素 容器元素
  el: null,
  /*
  // 放入的容器元素
  container: null,
  */
  // 初始化html
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
  /*
  update() {
    // 将数据渲染到页面
    // c.ui.number.text(m.data.n ?? 100) // $number.text(m.data.n  || 100)
    v.render()
  },
  */
  // 接受外部参数（传入容器）视图初始化
  init(container) {
    // 用jQuery封装对象 container <- #app1
    v.el = $(container)
    // v.render() // 在控制器初始化中调用v.render(n)
  },
  // render(container) 省去参数 里面的替换为 $(v.el)
  // 负责渲染页面
  render(n) {
    // 用jQuery方法见字符串变为HTML标签
    /* console.log('v.html: ')
    console.log(v.html)
    console.log('m.data.n: ')
    console.log(m.data.n) */
    /*
    if(v.el === null) {
      // 没渲染过
      v.el = $(v.html.replace('{{number}}', m.data.n))
        .prependTo(v.el)
    } else {
      // 渲染过
      const newEl = $(v.html.replace('{{number}}', m.data.n))
      v.el.replaceWith(newEl)
      // 更新地址 注意每次刷新都是不同的引用
      v.el = newEl
    }
    */
    // `v.el.children.length === 0` 代替 `v.el === null`判断视图元素是否为空
    if (v.el.children.length !== 0) {
      v.el.empty()
    }
    $(v.html.replace('{{number}}', n))
      .prependTo(v.el)
  }
}
/* 其他相关放到 c */
/*
console.log("$('#add1')")
debugger
console.log($('#add1')) // null
*/
const c = {
  init(container) {
    // 初始化渲染html
    v.init(container)
    v.render(m.data.n) // 1st view = render(data)
    /*
    c.ui = {
        // 需要的元素
        button1: $('#add1'),
        button2: $('#minus1'),
        button3: $('#mul2'),
        button4: $('#divide2'),
        number: $('#number'),
        recovery: $('#recovery')
    }
    */
    // c.bindEvents()
    c.autoBindEvents()
    // 监听触发标记`'m:updated'`
    // 统一在`eventBus.on()`监听的回调函数中渲染`v.render(m.data.n)`
    eventBus.on('m:updated', () => {
      v.render(m.data.n)
    })
  },
  // `'click #add1': 'add'`：`click`点击`#add1`的时候，调用`add`函数
  events: {
    'click #add1': 'add',
    'click #minus1': 'minus',
    'click #mul2': 'mul',
    'click #divide2': 'div',
    'click #recovery': 'recover',
  },
  add() {
    // m.data.n += 1
    // v.render(m.data.n)
    m.update({n: m.data.n += 1})
  },
  minus() {
    // m.data.n -= 1
    // v.render(m.data.n)
    m.update({n: m.data.n -= 1})
  },
  mul() {
    // m.data.n *= 2
    // v.render(m.data.n)
    m.update({n: m.data.n *= 2})
  },
  div() {
    // m.data.n /= 2
    // v.render(m.data.n)
    m.update({n: m.data.n /= 2})
  },
  recover() {
    // m.data.n = 100
    // v.render(m.data.n)
    m.update({n: m.data.n = 100})
  },
  // 表驱动编程-自动绑定事件
  // `'click #add1': 'add'`：`click`点击`#add1`的时候，调用`add`函数
  // 遍历哈希表 循环绑定事件
  autoBindEvents() {
    for(let key in c.events) {
      // console.log(key)
      // app1.js:124 click #add1
      // app1.js:124 click #minus
      // app1.js:124 click #mul2
      // app1.js:124 click #divide2
      // app1.js:124 click #recovery
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      // console.log(part1, ',', part2)
      const valueMethod = c[c.events[key]]
      // console.log(part1, part2, valueMethod)
      v.el.on(part1, part2, valueMethod)
    }
  }
  /*
  ,
  bindEvents() {
    //事件委托
    v.el.on('click', '#add1', () => {
      // 直接从`m.data`中获取数据 来操作
      // console.log('run here')
      m.data.n += 1
      // console.log(m.data.n)
      v.render(m.data.n) // 2nd view = render(data)
      localStorage.setItem('n', m.data.n.toString())
    })
    v.el.on('click', '#minus1',() => {
      m.data.n -= 1
      v.render(m.data.n)
      localStorage.setItem('n', m.data.n.toString())
    })
    v.el.on('click', '#mul2',() => {
      m.data.n *= 2
      v.render(m.data.n)
      localStorage.setItem('n', m.data.n.toString())
    })
    v.el.on('click', '#divide2',() => {
      m.data.n /= 2
      v.render(m.data.n)
      localStorage.setItem('n', m.data.n.toString())
    })
    v.el.on('click', '#recovery',() => {
      m.data.n = 100
      v.render()
      localStorage.setItem('n', m.data.n.toString())
    })
  }
  */
}

// c.init()
// export default c