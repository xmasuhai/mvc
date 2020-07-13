import $ from 'jquery'
import './app1.css'
/* 数据相关放到 m */
const m = {
  // 初始化数据
  data: {
    n: parseInt(localStorage.getItem('n')) ?? 100
  }
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
    v.render()
  },
  // render(container) 省去参数 里面的替换为 $(v.el)
  // 负责渲染页面
  render() {
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
    // `v.el.children.length === 0` 代替看 `v.el === null`判断视图元素是否为空
    if (v.el.children.length !== 0) {
      v.el.empty()
    }
    $(v.html.replace('{{number}}', m.data.n))
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
    // v.render(container)
    v.init(container)
    c.ui = {
        // 需要的元素
        button1: $('#add1'),
        button2: $('#minus1'),
        button3: $('#mul2'),
        button4: $('#divide2'),
        number: $('#number'),
        recovery: $('#recovery')
    }
    c.bindEvents()
  },
  bindEvents() {
    //事件委托
    v.el.on('click', '#add1', () => {
      // 直接从`m.data`中获取数据 来操作
      // console.log('run here')
      m.data.n += 1
      // console.log(m.data.n)
      v.render()
      localStorage.setItem('n', m.data.n.toString())
    })
    v.el.on('click', '#minus1',() => {
      m.data.n -= 1
      v.render()
      localStorage.setItem('n', m.data.n.toString())
    })
    v.el.on('click', '#mul2',() => {
      m.data.n *= 2
      v.render()
      localStorage.setItem('n', m.data.n.toString())
    })
    v.el.on('click', '#divide2',() => {
      m.data.n /= 2
      v.render()
      localStorage.setItem('n', m.data.n.toString())
    })
    v.el.on('click', '#recovery',() => {
      m.data.n = 100
      v.render()
      localStorage.setItem('n', m.data.n.toString())
    })
  }
}

// c.init()
export default c