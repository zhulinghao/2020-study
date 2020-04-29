// 插入排序
function insertSort(arr) {
  let i = 0;
  while(i < arr.length) {
    let cur = arr[i];
    let index = i;
    // 从后往前遍历已经排序完的元素
    for(let j = i - 1;j >= 0;j --) {
      // 如果当前元素比其中一个元素小，就把元素向后移动一位
      if(cur < arr[j]) {
        arr[j + 1] = arr[j];
        index = j;
      }
    }
    // 遍历完后该移动到右侧的都移动了，index就是需要插入的位置
    arr[index] = cur;
    i++;
  }

  return arr;
}

console.log(insertSort([2,1]))
