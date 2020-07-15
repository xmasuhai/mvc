class Model {
  // 属性传参 data
  constructor(options) {
    this.data = options.data // 传参复制到对象实例中
  }
  // 原型方法
  create() {
    // if(console && console.error) console.error('未实现 create')
    // console && console.error && console.error('未实现 create')
    // 可选链语法 `?.` 语法
    console?.error?.('未实现 create')
  }
  delete() {
    console?.error?.('未实现 delete')
  }
  update() {
    console?.error?.('未实现 update')
  }
  get() {
    console?.error?.('未实现 get')}
}

// 使用时 实例化： // const m = new Model() //m.create() //m.delete()

// 导出
export default Model