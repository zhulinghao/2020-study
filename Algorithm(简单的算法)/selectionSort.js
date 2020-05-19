function selectionSort(arr) {
  let len = arr.length;
  for(let i = 0;i < len;i ++) {
    let temp = null, tempIndex = null;
    for(let j = i + 1;j < len;j ++) {
      // 比第一个值小
      if((!temp && arr[j] < arr[i]) || (temp && arr[j] < temp)) {
        temp = arr[j];
        tempIndex = j;
      }
    }
    if(temp) {
      [ arr[i], arr[tempIndex] ] = [ temp, arr[i] ]
    }
  }
  return arr;
}

console.log(selectionSort([2,3,1,9,5,10,8,6]))
