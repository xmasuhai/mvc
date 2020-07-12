import $ from 'jquery'
import './app3.css'

const html = `
  <section id="app3" class="app3">
    <div class="square"></div>
  </section>
`
const $element = $(html).appendTo($('body>.page'))
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