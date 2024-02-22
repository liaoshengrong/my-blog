function Person(name, age) {
  this.name = name;
  this.age = age;
}
// const P = new Person("张三", 18);
const P = myNew(Person, "张三", 18);

// console.log(P.name, P.age);

function myNew(fun, ...rest) {
  const obj = {};
  obj.__proto__ = fun.prototype;
  fun.apply(obj, rest);
  return obj;
}

function memoize(func) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }
    const result = func.apply(this, args);
    cache[key] = result;
    console.log(result, cache, "result");
    return result;
  };
}

const compute = memoize((x, y) => x + y);
const res = compute(1, 2);
console.log(res, "res");
const res2 = compute(1, 2);
console.log(res2, "res2");
const res3 = compute(1, 3);
console.log(res3, "res3");

// const fn = new Promise((resolve, reject) => {
//   let res = 0;
//   setTimeout(() => {
//     res = 2;
//     resolve(res);
//   }, 1);
// });

// fn.then((res) => console.log(res, "then"));

function myPromise(fun) {
  let result = null;
  const fn = (res) => {
    result = res;
    return res;
  };

  fun(fn);

  return {
    then: (gn) => {
      const thenres = gn(result);
      return myPromise((resolve) => {
        resolve(thenres);
      });
    },
  };
}

const getfn = myPromise((resolve) => {
  resolve(444);
});

getfn
  .then((res) => {
    console.log(res, "mythen"); // 444
    return res + 1;
  })
  .then((res) => {
    console.log(res, "mythen2");
    return res + 1;
  })
  .then((res) => {
    console.log(res, "mythen3");
  });
