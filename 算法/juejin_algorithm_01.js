let list = [
  'h3',
  'h1', 'h3',
  'h1', 'h2', 'h3', 'h3', 'h2', 'h3',
  'h1', 'h4', 'h2', 'h3'
]

// editObj 为空，下一个标签是当前的子标签时，直接在 res 上 push item，并把 item 赋值给 editObj
// editObj 不为空，下一个标签是当前的子标签时，在 editObj 上 push item，并把 item 赋值给 editObj
// editObj 为空，下一个标签不是当前的子标签时，直接在 res 上 push item， 并把 editObj 清空
// editObj 不为空，下一个标签不是当前的子标签时，在 editObj 上 push item， 并把 editObj 清空

function convert(list) {
  let res = [],
  editObj = null;
  for(let i = 0;i < list.length;i ++) {
    let name = list[i],
    item = { name };
    let level = name[1],
    nextLevel = list[i + 1] && list[i + 1][1];

    // 下一个是当前的子标签
    if(level < nextLevel) {
      item.children = [];
    }
    // 有正在修改的对象
    if(editObj) {
      editObj.children.push(item);
    } else {
      res.push(item);
    }
    if(level <= nextLevel) {
      // 同级的话，不更新editObj
      if(level !== nextLevel) {
        editObj = item;
      }
    } else {
      editObj = null;
    }
  }
  return res;
}

console.log(convert(list));
