// learn by https://ts.xcatliu.com/advanced/enum

// null和undefined
(function() {
  // 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型
  let u: undefined = undefined;
  let n: null = null;

  let str: string = u;
  str = n;

  // void 类型的变量不能赋值给 number 类型的变量
  let v: void;
  str = v;  // 【error】：不能将类型“void”分配给类型“string”
})();

// any 任意值 & 类型推论
(function() {
  // 等价于：let someting:any
  let something;
  something = 123;
  something = '123';

  let str = '';  // 等价于 let str:string = '';
  str = '123'; 
  str = 123;  // 【error】： 不能将类型“void”分配给类型“string”
})();

// 联合类型
(function() {
  let favNum: string | number;
  favNum = 'S';
  favNum = 123;
  
  function getLength(something: string | number): number {
    // length不是string和number的共有属性，故报错
    return something.length;
  }
})();

// 对象类型  接口 interface
// 可以对类的一部分行为进行抽象，也常用于对【对象的形状（shape）】进行描述
(function() {
  interface Person {
    readonly id: number, // 只读属性
    name: string,
    age: number,
    gender?: number,    // 可选属性，可以不填
    [prop:string]: any  // 任意属性，允许有任意熟悉，一旦定义了任意属性，确定属性和可选属性必须是它的类型的子集
  }
  let tom:Person = {
    id: 1,
    name: 'tom',
    age: 22,
    wwe: 123
  }

  tom.id = 333;  // Cannot assign to 'id' because it is a read-only property.
});

// 数组的类型
(function() {
  // 类型 + 中括号表示法
  let fibonacci:(number | string)[] = [1,1,2,3,5,'8'];

  // 数组泛型
  let arr1: Array<number> = [1,1,2,3,5,'8'];

  // 类数组（Array-like Object）, 比如arguments
  function sum() {
    // callee，和length这两个属性是必须约束的
    interface Arguments {
      [index: number]: number,  // 任意属性必须为number
      length: number,
      callee: Function
    }
    let args: IArguments = arguments;
    // 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等
  }
})();

// 函数的声明
(function() {
  function sum(x: number, y: number):number {
    return x + y;
  }
  sum(1,2);  // 参数不能多不能少，多了少了都报错
  // 函数表达式
  // mySum的类型是通过类型推论推断出来的
  let mySum = function(x:number,y:number):number {
    return x+y;
  }
  // 正常来说要这样写  => 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
  let mySum2: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
  };
  mySum(1.2,33);

  // 接口定义函数的Shape
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  let mySearch: SearchFunc;

  mySearch = function(source: string, subString: string) {
    return false;
  }
  mySearch('123', '1')

  // 可选参数, 必选参数不能位于可选参数后。
  function buildName(firstName: string, lastName?: string): string {
    if(lastName) {
      return firstName + ' ' + lastName;
    } else {
      return firstName;
    }
  }

  // 剩余参数
  function push(arr: any, ...items: number[]) {
    items.forEach(item => arr.push(item));
  }
  push([], 1,2,3,4);

  // 函数的重载，允许一个函数接受不同数量或类型的参数时，作出不同的处理
  function reverse(x:number):number;
  function reverse(x:string):string;
  function reverse(x: (number|string) ):number|string {
    if(typeof x === 'string') {
      return x.split('').reverse().join('');
    } else {
      return Number(x.toString().split('').reverse().join(''));
    }
  }
  reverse(123456);
})();


// 类型断言 type assertion （值 as 类型）
(function() {
  /**
   * ts 不确定一个联合类型的变量是哪个类型时，只能访问此联合类型中所有类型共有的属性，
   * 而有时候我们需要在不确定类型的时候访问其中一个类型特有的属性或方法，这时就需要用到断言
   */

  interface Cat {
      name: string;
      run(): void;
  }
  interface Fish {
      name: string;
      swim(): void;
  }

  function isFish(animal: Cat | Fish) {
      if (typeof (animal as Fish).swim === 'function') {
          return true;
      }
      return false;
  }
})();

Math.floor(1.23);

// 声明文件
(function() {
  jQuery("123");
})();
