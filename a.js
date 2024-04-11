// 最长的回文字符串长度
const s = 'abcabadcbc'
// 记录每一个字符的下标，若检测到重复记录则查看长度，max对比后给length赋值
const palindrome = (s) => {
  const map = new Map()
  let start = 0
  let length = 0
  for (let i = 0; i < s.length; i++) {
    const v = s[i]
    if (!map.has(v)) {
      map.set(v, i)
    } else {
      length = Math.max(length, i - map.get(v) + 1);
      console.log(map, length, v, i, 'map00');
      map.set(v, i)
    }

  }
  return length;
}

// console.log(palindrome(s));

// 最长的不重复字符长度

const noRepeat = (s) => {
  let left = 0;
  let length = 0;
  const map = new Map()
  for (let i = 0; i < s.length; i++) {
    const v = s[i]
    if (map.has(v) && map.get(v) > left) {
      left = map.get(v) + 1
    }
    length = Math.max(length, i - left + 1)
    map.set(v, i)
  }
  return length
}

console.log(noRepeat('abcabadcbc'))