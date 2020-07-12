import $ from 'jquery'
import './app1.css'

const style = `
body {
  color: red;
}
`

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
// 用jQuery方法见字符串变为HTML标签
const element = $(html)
  .prependTo($('body>.page'))

const $button1 = $('#add1')
const $button2 = $('#minus1')
const $button3 = $('#mul2')
const $button4 = $('#divide2')
const $number = $('#number')
const $recovery = $('#recovery')

let n = localStorage.getItem('n');
// $number.text(n || 100)
$number.text(n ?? 100)

$button1.on('click', () => {
  let n = parseInt($number.text())
  n += 1
  localStorage.setItem('n', n.toString())
  $number.text(n)
})
$button2.on('click', () => {
  let n = parseInt($number.text())
  n -= 1
  localStorage.setItem('n', n.toString())
  $number.text(n)
})
$button3.on('click', () => {
  let n = parseInt($number.text())
  n *= 2
  localStorage.setItem('n', n.toString())
  $number.text(n)
})
$button4.on('click', () => {
  let n = parseInt($number.text())
  n /= 2
  localStorage.setItem('n', n.toString())
  $number.text(n)
})
$recovery.on('click', () => {
  $number.text('100')
  let n = parseInt($number.text())
  n = 100
  localStorage.setItem('n', n.toString())
})