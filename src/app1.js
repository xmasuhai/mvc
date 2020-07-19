import Vue from 'vue'
import './app1.css'
const init = (el) => {
  const m = {
    get() {
      return parseFloat(localStorage.getItem('n')) || 100
    },
    set(num) {
      localStorage.setItem('n', num.toString())
    }
  }
  new Vue({
    el: el,
    data: {
      num: m.get()
    },
    methods: {
      add() {this.num += 1},
      minus() {this.num -= 1},
      mul() {this.num *= 2},
      div() {this.num /= 2},
      recover() {this.num = 100}
    },
    watch: {
      num() {
        m.set(this.num)
      }
    },
    template: `
      <section id="app1" class="app1">
        <div class="output">
          <span id="number">{{num}}</span>
        </div>
        <div class="actions">
          <button @click="add" id="add1">+1</button>
          <button @click="minus" id="minus1">-1</button>
          <button @click="mul" id="mul2">×2</button>
          <button @click="div" id="divide2">÷2</button>
          <button @click="recover" id="recovery">恢复</button>
        </div>
      </section>
    `,
  })
}
export default init