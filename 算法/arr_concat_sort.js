let arr1 = [1,4,6,7];
let arr2 = [3,4,6,7,8];

// function concatAndSort(arr1, arr2) {
//   let res = arr1.slice();
//   // 时间复杂度O(n)
//   for(let i = 0;i < arr2.length;i ++) {
//     res.push(arr2[i]);
//   }
  
//   // 快排
//   function fastSort(arr) {
//     if(arr.length <= 1) {
//       return arr;
//     }
//     let povitIndex = Math.floor(arr.length / 2), left = [], right = [];
//     let povit = arr.splice(povitIndex, 1)[0]
//     for(let i = 0;i < arr.length;i ++) {
//       if(arr[i] >= povit) {
//         right.push(arr[i]);
//       } else {
//         left.push(arr[i]);
//       }
//     }

//     return fastSort(left).concat([povit]).concat(fastSort(right));
//   }

//   return fastSort(res);
// }

function concatAndSort(arr1, arr2) {
  let len1 = arr1.length,
  len2 = arr2.length;
  maxLen = len1 > len2 ? len1 : len2,
  newArr = [];

  for(let i = 0;i < maxLen;i ++) {
    let item1 = arr1[i], item2 = arr2[i];
    if(item1 > item2) {
      newArr.push(item1);
      newArr.push(item2);
    } else {

    }
  }
  
}

console.log(concatAndSort(arr1, arr2));
