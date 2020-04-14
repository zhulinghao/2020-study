class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.oldVal = this.getOldVal();
  }

  getOldVal() {
    Dep.target = this;
    let oldVal = compileUtil.getVal(this.expr, this.vm);
    Dep.target = null;
    return oldVal
  }

  update() {
    let newVal = compileUtil.getVal(this.expr, this.vm);
    if(newVal !== this.oldVal) {
      this.oldVal = newVal;
      this.cb(newVal);
    }
  }
}

// 收集 watcher
class Dep {
  constructor() {
    this.subs = []
  }
  // 收集观察者
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 通知观察者去更新
  notify() {
    console.log(this.subs)
    // 通知观察者，对视图进行更新
    this.subs.forEach(w => w.update());
  }
}

class Observe {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    if(Object.prototype.toString.call(data) === "[object Object]") {
      Object.keys(data).forEach(key => {
        this.defineRective(data, key, data[key]);
      })
    }
  }

  defineRective(data, key, value) {
    // 如果这个value是json对象，那么就会被监听
    this.observe(value);
    const dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 初始化就会触发
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newVal) {
        this.observe(newVal);
        if(newVal !== value) {
          value = newVal;
        }
        // 通知Dep发生了变化
        dep.notify();
      }
    })
  }
}
