import $ from 'jquery'
import './app2.css'
const eventBus = $({})
const m = {
  data: {
    index: localStorage.getItem(localKey) || 0
  }
}
const v = {}
const c = {}

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

//read localStorage tab status
const localKey = 'app2.index'
// 保底值
// let index = localStorage.getItem(localKey) || 0
let index = localStorage.getItem(localKey) ?? 0

// 事件委托
$tabBar.on('click', 'li', (e) => {
  // console.log(e.target) // 点击时可能获取到目标元素的子元素 改成用 e.currentTarget
  // console.log(e.currentTarget) // DOM 元素难用 换成用jQuery元素 封装$li
  const $li = $(e.currentTarget)
  const index = $li.index()
  // console.log(index)

  //write localStorage tab status
  localStorage.setItem(localKey, index)

  /*
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
   */

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

