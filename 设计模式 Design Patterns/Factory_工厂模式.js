/*
 * @Author: your name
 * @Date: 2020-05-22 11:06:00
 * @LastEditTime: 2020-05-22 11:26:20
 * @LastEditors: Please set LastEditors
 * @Description: 工厂模式，利用方法来决定究竟要实例化那个具体的类
 * @FilePath: \设计模式 Design Patterns\Factory_工厂模式.js
 */ 

/**
 * 简单的工厂模式
 */

;(function() {
  class Cat {
    constructor() {
      this.name = '猫'
    }
  }
  
  class Dog {
    constructor() {
      this.name = '狗'
    }
  }
  
  class Factory {
    constructor(role) {
      return this.switchRole(role)
    }
  
    switchRole(role) {
      switch(role) {
        case '猫':
          return new Cat()
        case '狗':
          return new Dog()
        default: 
          return {}
      }
    }
  }
  
  let cat = new Factory('猫');
  console.log(cat)
  
  let dog = new Factory('狗');
  console.log(dog)
})()

/**
 * 复杂工厂模式
 */

;(function() {
  class Cat {
    constructor() {
      this.name = '猫'
    }
  }
  
  class Garfield {
    constructor() {
      this.name = '加菲猫'
    }
  }
  class Persian {
    constructor() {
      this.name = '波斯猫'
    }
  }

  class Dog {
    constructor() {
      this.name = '狗'
    }
  }
  
  class Factory {
    constructor(role) {
      return this.createInstance(role)
    }
    createInstance() {
      return new Error('我只是抽象类')
    }
  }

  class CatFactory extends Factory {
    constructor(role) {
      super(role)
    }
    createInstance(role) {
      switch(role) {
        case '加菲猫':
          return new Garfield()
        case '波斯猫':
          return new Persian()
        default: 
          return {}
      }
    }
  }
  let gf = new CatFactory('加菲猫');
  console.log(gf)
  
  let ps = new CatFactory('波斯猫');
  console.log(ps)
})()

