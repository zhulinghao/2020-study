// 1，输入：“get1_install2_app3_list4_by5_android6”（每个单词后面总会携带一个数字，只有偶数才删掉），我不用循环只用正则怎么实现输出"get1InstallApp3ListBy5Android"？
let str = 'get1_install2_app3_list4_by5_android6';
let res1 = str.replace(/_[a-z]/g, function(match) {
  return match[1].toUpperCase();
}).replace(/[02468]/g, "");

console.log(res1); // get1InstallApp3ListBy5Android

// console.log(convert("get1_install2_app3_list4_by5_android6"))

// 2，不能使用任何循环控制语句和迭代器的情况下实现一个0到1000的数组赋值。
let arr = Array.from(new Array(1001), (_, index) => index);
console.log(arr);

// 3，判断两个对象（注意特殊对象的处理）找出不一致的是哪个变量，返回的格式类似："root变量-父变量-...-不一致的变量"的字符串；
let json1 = {
  a: '1',
  b: '2',
  d: {
    x: 1,
    f: {
      g: 1
    }
  }
};

let json2 = {
  a: '1',
  b: '1',
  d: {
    x: 5,
    f: {
      g: 2
    }
  }
}

let res3 = [];
function diff(a, b, path) {
  !path && (path = []);
  let current;
  for(let k in a) {
    current = '';
    // 为引用类型
    if(a[k] instanceof Object && b[k] instanceof Object) {
      diff(a[k], b[k], [...path, k]);
      continue;
    }
    // 值类型不相等
    if(a[k] !== b[k]) {
      current = k;
    }
    if(current) res3.push([...path, current]);
  }
}
diff(json1,json2);
console.log(res3.map(item => item.join('-'))); // [ 'b', 'd-x', 'd-f-g' ]