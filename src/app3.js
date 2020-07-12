import $ from 'jquery'
import './app3.css'

const html = `
  <section id="app1" class="app1">
    <div class="output">
      <span id="number">100</span>
    </div>
    <div class="actions">
      <button id="add1">+1</button>
      <button id="minus1">-1</button>
      <button id="mul2">×2</button>
      <button id="divide2">÷2</button>
      <button id="recovery">恢复</button>
    </div>
  </section>
`

const $square = $('#app3 .square')
const localKey = 'app3.active'

// 布尔值 判断是否点击了  no undefined / yes
const active = localStorage.getItem(localKey) === 'yes'
/*

if(active) {
  $square.addClass('active')
} else {
  $square.removeClass('active')
}
*/
// 简化成
$square.toggleClass('active', active)

$square.on('click', () => {
  if ($square.hasClass('active')) {
    $square.removeClass('active')
    localStorage.setItem(localKey, 'no')
  } else {
    $square.addClass('active')
    localStorage.setItem(localKey, 'yes')
  }
  // $square.toggleClass('active')
})