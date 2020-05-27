/*
 * @Author: your name
 * @Date: 2020-05-22 11:00:59
 * @LastEditTime: 2020-05-22 11:05:48
 * @LastEditors: Please set LastEditors
 * @Description: 单例模式，只会创建一个实例，多次创建实例都会返回第一次创建的实例
 * @FilePath: \设计模式 Design Patterns\Single_单例模式.js
 */ 
const Single = (function() {
  let instance = null;
  function createSingle(name) {
    if(instance) return instance;
    this.name = name;
    instance = this;
    return instance;
  }
  return createSingle;
})();

let a = new Single('123');
let b = new Single('123');

console.log(a)
console.log(a === b)

