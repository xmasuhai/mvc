import './app2.css'
import Vue from 'vue'
const init = (el) => {
  const m = {
    get() {
      return parseInt(localStorage.getItem('app2.index')) || 0
    },
    set(index) {
      localStorage.setItem('app2.index', index.toString())
    }
  }
  new Vue({
    el: el,
    data: {
      index: m.get()
    },
    watch: {
      index() {
        set(this.index)
      }
    },
    template: `
      <section id="app2" class="app2">
          <ol class="tab-bar">
            <li :class="index === 0 ? 'selected':''"
                @click="index = 0"><span>111111</span></li>
            <li :class="index === 1 ? 'selected':''"
                @click="index = 1"><span>222222</span></li>
          </ol>
          <ol class="tab-content">
            <li :class="index === 0? 'active': ''">内容1</li>
            <li :class="index === 1? 'active': ''">内容2</li>
          </ol>
      </section>
    `,
  })
}
// 导出初始化方法init(el) 在main.js 中获取el <- #app2: y('#app2')
export default init