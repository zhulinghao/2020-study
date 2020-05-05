// 类型别名
(function() {
  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver; // 联合类型
  function getName(n: NameOrResolver): Name {
    if(typeof n === 'string') {
      return n;
    } else {
      return n();
    }
  }
  // 字符串字面量类型， 约束取值只能是某个字符串中的一个
  type EventNames = 'click' | 'scroll' | 'mousemove';
  let event:EventNames;
  event = '123'; // 不能将类型“"123"”分配给类型“EventNames”
})();

// 元组  数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象
(function() {
  let tom: [string, number] = [ 'Tom', 25 ];
  // tom[0] = 123;
})();

// 枚举 Enum 枚举（Enum）类型用于取值被限定在一定范围内的场景
(function() {
  enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat }
  console.log(Days["Sun"] === 0); // true
  console.log(Days["Mon"] === 1); // true
  console.log(Days["Tue"] === 2); // true
  console.log(Days["Sat"] === 6); // true

  console.log(Days[0] === "Sun"); // true
  console.log(Days[1] === "Mon"); // true
  console.log(Days[2] === "Tue"); // true
  console.log(Days[6] === "Sat"); // true
})();

