const OP = Object.prototype;
// 需要重写的数组方法
const OAM = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
// pop 删除数组中最后一个元素，并返回该元素
// shift 删除数组中第一个元素，并返回该元素

class JsonObserve {
  constructor({ obj, callback, el }) {
    if(OP.toString.call(obj) !== "[object Object]") {
      console.error('this paramter must be an object：' + obj);
    }
    this.$callback = callback;
    this.observe(obj);

    this.compile(document.querySelector("#app"));
  }

  compile(node) {
    [].forEach.call(node.childNodes, child => {
        if(!child.firstElementChild && /\{\{(.*)\}\}/.test(child.innerHTML)){
            let key = RegExp.$1.trim()
            child.innerHTML = child.innerHTML.replace(new RegExp('\\{\\{\\s*'+ key +'\\s*\\}\\}', 'gm'), data[key]) 
        }
        else if (child.firstElementChild) 
            this.compile(child)
    })
  }

  // 检查
  observe(obj, path) {
    path = path || ['data'];
    if(OP.toString.call(obj) === "[object Array]") {
      this.overrideArrayProto(obj, path);
      // return;
    }
    Object.keys(obj).forEach(key => {
      let oldVal = obj[key];
      Object.defineProperty(obj, key, {
        // value: 123,
        // writable: false,   // 是否可写
        // enumerable: true,  // 是否可通过 for in 枚举
        // configurable: true // 是否使用 delete 删除
        get() {
          // return 'xxx';
          return oldVal;
        },
        set: (newVal) => {
          if(oldVal !== newVal) {
            // 如果属性的值是json数据的话，那么监听该属性的值
            if(OP.toString.call(newVal) === "[object Object]" || OP.toString.call(newVal) === "[object Array]") {
              this.observe(newVal, key, [...path, key]);
            }
            this.$callback(newVal, oldVal, [...path, key]);
            oldVal = newVal;
          }
        }
      })
      // 如果这个属性的值是json或者array，那么监听该属性的值
      if(OP.toString.call(obj[key]) === '[object Object]' || OP.toString.call(obj[key]) === '[object Array]'){
        this.observe(obj[key], [...path, key]);
      }
    })
  }
  
  // 覆写被监听数组的原型方法
  overrideArrayProto(array, path) {
    var originalProto = Array.prototype,
    overrideProto = Object.create(Array.prototype),
    self = this,
    result;

    OAM.forEach(method => {
      var oldArray = [];
      Object.defineProperty(overrideProto, method, {
        value() {
          oldArray = this.slice(0);
          var arg = [].slice.apply(arguments);
          // 调用原始原型的数组方法，获的结果
          result = originalProto[method].apply(this, arg);
          self.observe(this, path);
          self.$callback(this, oldArray, path);
          return result;
        },
        writable: true,
        enumerable: false,
        configurable: true
      })
    })

    array.__proto__ = overrideProto;
  }

}