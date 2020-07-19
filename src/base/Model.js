import EventBus from './EventBus'
class Model extends EventBus {
  constructor(options) {
    super()
    const keys = ['data', 'update', 'create', 'delete', 'get']
    keys.forEach((key) => {
      if(key in options) {
        this[key] = options[key]
      }
    })
  }
  create() {
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
export default Model