const compileUtil = {
  getVal(expr, vm) {
    return expr.split('.').reduce((data, currentVal) => {
      return data[currentVal];
    }, vm.$data);
  },
  text(node,expr,vm) {
    let value;
    if(expr.indexOf('{{') > -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        return this.getVal(args[1], vm);
      });
    } else {
      value = this.getVal(expr, vm);
    }

    this.updater.textUpdater(node, value);
  },
  html(node,expr,vm) {
    const value = this.getVal(expr, vm);
    // 声明订阅者，就会在Dep中添加订阅者， 当observer劫持到数据变化时，遍历Dep中的订阅者，如果value有更新的话，触发这个回调函数
    new Watcher(vm, expr, (newVal) => {
      this.updater.htmlUpdater(node, newVal);
    })
    this.updater.htmlUpdater(node, value);
  },
  model(node,expr,vm) {
    const value = this.getVal(expr, vm);
    this.updater.modelUpdater(node, value);
  },
  on(node,expr,vm,eventName) {
    let fn = vm.$options.methods[expr];
    node.addEventListener(eventName, fn.bind(vm), true);
  },
  bind(node,expr,vm,attrName) {
    const value = this.getVal(expr, vm);
    this.updater.bindUpdater(node, attrName, value)
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    textUpdater(node, value) {
      node.textContent = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    bindUpdater(node, attrName, value) {
      node.setAttribute(attrName, value);
    }
  }
}


class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // 1 把node放到文档碎片当中，数据修改了，才修改dom，防止回流重绘影响性能
    const fragment = this.node2Fragment(this.el);
    // 2 编译模板
    this.compile(fragment);
    // 3 追加子元素到根元素
    this.el.appendChild(fragment);
  }

  compile(fragment) {
    const childNodes = fragment.childNodes;
    [...childNodes].forEach(child => {
      if(this.isElementNode(child)) {
        // 是元素节点， 需要编译
        this.compileElement(child);
      } else {
        // 文本节点，编译
        this.compileText(child);
      }

      if(child.childNodes && child.childNodes.length) {
        this.compile(child);
      }
    })
  }
  compileElement(node) {
    // console.log('element',node);
    const attributes = node.attributes;
    [...attributes].forEach(attr => {
      const { name, value } = attr;
      if(this.isDirective(name)) {
        const [,directive] = name.split('-');  // text on:click
        const [dirName, eventName] = directive.split(":"); // [text, undefined] [on, click]
        // 更新数据，数据驱动视图
        compileUtil[dirName](node, value, this.vm, eventName);
        // 删除标签上的属性
        node.removeAttribute(name);
      }
      // 处理 @click 这种属性
      else if(this.isEventName(name)) {
        const [,eventName] = name.split('@');  // text on:click
        // 更新数据，数据驱动视图
        compileUtil['on'](node, value, this.vm, eventName);
        // 删除标签上的属性
        node.removeAttribute(name);
      }
    });
  }
  compileText(node) {
    // console.log('text', node);
    const content = node.textContent;

    if(/\{\{(.+?)\}\}/.test(content)) {
      compileUtil['text'](node, content, this.vm);
    }

  }
  node2Fragment(el) {
    // 创建文档碎片
    const f = document.createDocumentFragment();
    let firstChild;
    while(firstChild = el.firstChild) {
      f.appendChild(firstChild);
    }
    return f;
  }
  isDirective(attrName) {
    return attrName.startsWith('v-');
  }
  isEventName(eventName) {
    return eventName.startsWith('@');
  }
  // 是否是元素节点对象
  isElementNode(node) {
    return node.nodeType === 1;
  }
}

class MyVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    if(this.$el) {
      new Observe(this.$data)

      // 解析器
      new Compile(this.$el, this)
    }
  }
}
