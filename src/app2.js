import './app2.css'
import $ from 'jquery'
const localKey = 'app2.index'
const eventBus = $({})
const m = {
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem(localKey, m.data.index)
  }
}
const v = {
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
  init(container) {
    v.el = $(container)
  },
  render(index) {
    if (v.el.children.length !== 0) {
      v.el.empty()
    }
    $(v.html(index)).appendTo(v.el)
  }
}
const c = {
  init(container) {
    v.init(container)
    v.render(m.data.index)
    c.autoBindEvents()
    eventBus.on('m:updated', () => {
      v.render(m.data.index)
    })
  },
  events: {
    'click .tab-bar li': 'x'
  },
  x(e) {
    // console.log(e.currentTarget.dataset.index)
    const index =  parseInt(e.currentTarget.dataset.index)
    m.update({index: index})
    // console.log('x')
  },
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

/*
const html = `
  <section id="app2" class="app2">
    <ol class="tab-bar">
      <li><span>111111</span></li>
      <li><span>222222</span></li>
    </ol>
    <ol class="tab-content">
      <li>内容1</li>
      <li>内容2</li>
    </ol>
  </section>
`
const $element = $(html)
  .appendTo($('body>.page'))
const $tabBar = $('#app2 .tab-bar')
const $tabContent = $('#app2 .tab-content')

// 事件委托
$tabBar.on('click', 'li', (e) => {
  // console.log(e.target) // 点击时可能获取到目标元素的子元素 改成用 e.currentTarget
  // console.log(e.currentTarget) // DOM 元素难用 换成用jQuery元素 封装$li
  const $li = $(e.currentTarget)
  const index = $li.index()
  // console.log(index)

  //write localStorage tab status
  localStorage.setItem(localKey, index)

  /!*
    // 逻辑与样式耦合的代码1
    $tabContent.children()
      .eq(index).css({ display: 'block' })
      .siblings().css({
        display: 'none'
      })

    // 逻辑与样式耦合的代码2
    $tabContent.children()
      .eq(index).show()
      .siblings().hide()
   *!/

  // 行为与样式分离1 // 背景色切换
  $li.addClass('selected')
    .siblings()
    .removeClass('selected')

  // 行为与样式分离2 // 内容的显示与隐藏
  $tabContent
    .children()
    .eq(index)
    .addClass('active')
    .siblings()
    .removeClass('active')

})

// 帮你点击 代替在HTML标签中设置样式属性 'selected' 'active'
// $tabBar.children().eq(0).trigger('click')
$tabBar.children().eq(index).trigger('click')

*/

export default c