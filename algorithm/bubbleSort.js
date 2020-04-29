function bubbleSort(arr) {
  let len = arr.length;
  for(let i = 0;i < len;i ++) {
    let isModify = false;
    for(let j = 0;j < len;j ++) {
      if(arr[j] > arr[j+1]) {
        [ arr[j], arr[j + 1] ] = [ arr[j+1], arr[j] ]
        isModify = true;
      }
    }
    if(!isModify) return arr;
  }
  return arr;
}

console.log(bubbleSort([2,3,1,9,5,10,8,6]))
