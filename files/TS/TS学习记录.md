# ts 中自带的一些类型

## Partial : 使所有属性变为可选

```ts
type T7 = Partial<T6>;
const t7: T7 = {};
```

## Required : 使所有属性变为必选

```ts
type T8 = Required<T6>;
const t8: T8 = {
  name: "s",
  age: 1,
};

interface T6 {
  name: string;
  age: number;
}
```

## Omit : 排除某些属性

```ts
type T9 = Omit<T6, "name">;
const t9: T9 = {
  age: 1,
  name: "s", // 报错: 没有name
};
```

## Pick : 获取某些属性

```ts
type T10 = Pick<T6, "name">;
const t10: T10 = {
  name: "s",
  age: 1, // 报错: 没有age
};
```

## Exclude : 排除某些类型

```ts
type E = "name" | "age";
type E2 = Exclude<E, "name">;
let e2: E2 = "age";
e2 = "name"; // 报错: 没有name
```

## Extract : 提取某些类型

```ts
type E3 = Extract<E, "name">;
let e3: E3 = "name";
e3 = "age"; // 报错: 没有age
```

## Record : 构建一个对象

```ts
type R = Record<"a" | "b", any>;
let r: R = {
  a: "a",
  b: "b",
  c: "c", //报错： 没有c
};
```

## NonNullable : 排除 null 和 undefined

```ts
type N = string | null | undefined;
let nonNullableValue: NonNullable<N>;
nonNullableValue = "Hello"; // 正常
nonNullableValue = null; // 报错 不能将类型“null”分配给类型“string”。
nonNullableValue = undefined; // 不能将类型“undefined”分配给类型“string”。
```

## Parameters : 获取函数参数

```ts
type P = Parameters<(a: number, b: string) => string>;
let params: P = ["a", "b"]; // 正常
```

## ReturnType : 获取函数返回值

```ts
type R = ReturnType<(a: number, b: string) => string>;
let returnType: R = "a"; // 正常
```

# 三种类型守卫

先放个 obj

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
```

## in

```js
obj.d; // 报错：“obj”上不存在属性“d”。
if ("d" in obj) {
  obj.d; // 正常
}
```

## typeof

```js
const str: string | number = "str";
obj.a = str; // 报错：不能将类型“string”分配给类型“number”。
if (typeof str === "number") {
  obj.a = str; // 正常
}
```

## instanceof

```ts
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}

const animal = new Animal("animal");
animal.breed; // 报错：没有breed
if (animal instanceof Dog) {
  animal.breed; // 正常
}
```

# 类型：函数重载

为了让函数的**传参组合**固定

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any) {
  return a + b;
}
add(1, "a"); // 报错：需要固定组合 number + number
add("a", "b"); // 正常
add(1, 2); // 正常
```

# 类型合并

除了使用&或|符号外，可以使用同名 interface

```ts
interface A {
  a: number;
}
interface A {
  b: string;
}
const oa = {} as A;
oa.a; // 正常
oa.b; // 正常
```

# 只读属性 readonly

```ts
interface P {
  readonly name: string;
}
const op = {} as P;
op.name; // 正常
op.name.replace("a", "b"); // 正常
add(op.name, "b"); // 正常
op.name = "a"; // 报错：属性“name”为只读
```

# 任意 key 名

```ts
interface C {
  [key: string]: string;
}
const oc = {} as C;
oc.key; // 正常
oc.key2; // 正常
```

# 使用 interface 声明函数

```ts
interface I {
  (a: number, b: number): number;
}
const oi: I = (a, b) => a + b;
oi(1, 2); // 正常
```

# Implements : 继承类型, 是定义类的类型

```ts
interface I2 {
  name: string;
}
class C2 implements I2 {
  // 报错：类“C2”没有包含属性“name”。
  // name: string;
  age: string;
  gender: string;
}
```

# extends : 继承类

```ts
class C3 implements I2 {
  // 正常
  name: string;
  age: string;
  gender: string;
}
class C4 extends C3 implements I2 {
  x: string;
  constructor() {
    super();
    this.x = "x";
  }
}
const oc4 = new C4();
oc4.name; // 正常
oc4.x; // 正常
// 也可作为判断语句
type Re<T> = T extends string ? T : never;
```

# 私有字段 private / protected / \#

```ts
class C5 {
  private name: string;
  protected age: string;
  #gender: string;
  // 定义为getter
  get Name() {
    this.#gender; // 正常
    this.age; // 正常
    return this.name; // 正常
  }
  // 定义为setter
  set Name(name: string) {
    this.name = name;
  }
}

const oc5 = new C5();
oc5.name; // 属性“name”为私有属性，只能在类“C5”中访问。
oc5.age; // 属性“age”受保护，只能在类“C5”及其子类中访问。
oc5.#gender; // 属性 "#gender" 在类 "C5" 外部不可访问，因为它具有专用标识符。
oc5.Name; // 正常
oc5.Name = "a"; // 正常
```

# 操作符

## keyof

```ts
interface T2 {
  name: string;
  age: number;
}
type T3 = keyof T2; // name | age
let key: T3 = "age"; // 正常
key = "name"; // 正常
```

## typeof

```ts
const list = ["a", "b"];
type T4 = typeof list; // 取出list的类型
const t4: T4 = ["a", "b"];
```

## in

```ts
// 只能用type来声明
// T5 类型为：{ a: string; b: string; c: string; }
type Keys = "a" | "b" | "c";
type T5 = {
  [key in Keys]: string;
};
const t5: T5 = {
  a: "a",
  b: "b",
  c: "c",
};
interface TST {
  [key: Keys]: string; // 索引签名参数类型不能为文本类型或泛型类型。请考虑改用映射的对象类型。
}
```

## infer 推断、暗指

我们要得到一个函数的返回类型时，这样用

```ts
type RType<T> = T extends (...args: any[]) => infer R ? R : any;
// explain: T 是否 是一个函数，是的话，返回 函数的返回值
function add2(a: number, b: string) {
  return a + b;
}

type Result = RType<typeof add2>;
```
