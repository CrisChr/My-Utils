const utils = require("./utils");

const checkType = utils.checkType;
const formatDate = utils.formatDate;
const isEqual = utils.isEqual;
const compose = utils.compose;
const DeepClone = utils.DeepClone;

console.log(checkType.isArray([1,2,12,1,88,666])); //true
console.log(checkType.isNull(null)); //true
console.log(checkType.isObject({a:"yes"})); //true
console.log(checkType.isNumber(Number(666))); //true

/**--------------------------------------- */

console.log(formatDate("2020/8/25"));
console.log(formatDate("1993/11/11 23:09:21"));

/**--------------------------------------- */


console.log(isEqual(0, 0)) // true
console.log(isEqual(0, -0)) // false

console.log(isEqual(NaN, NaN)); // true
console.log(isEqual(Number(NaN), Number(NaN))); // true

console.log(isEqual('Curly', new String('Curly'))); // true

console.log(isEqual([1], [1])); // true
console.log(isEqual({
  value: 1
}, {
  value: 1
})); // true

class Animal{
  constructor(name){
    this.name = name;
  }
}

class Person{
  constructor(name){
    this.name = name;
  }
}

const animal = new Animal("red");
const person = new Animal("Kevin");

console.log(isEqual(animal, person)) //false

/**----------------------------------- */

function add(x){
  return x + 5;
}

function mult(y){
  return y * 5;
}

function devide(z){
  return Math.round(z / 5);
}

const com = compose(devide, mult, add);

console.log(com(5));

let a = 66;
let b = DeepClone(a);
console.log(b);

let c = {d: 88, e: {f:666, g:999}};
let h = DeepClone(c);
h.d = 233;
console.log(c, h);

let i = new Map();
i.set("name", "John");
i.set("age", 25);
let j = DeepClone(i);
j.set("name", "Selina");
console.log(i, j);

let k = new Set();
k.add(1);
k.add(2);
k.add(3);
let l = DeepClone(k);
l.delete(2);
console.log(k, l);

let m = new Date("1993/05/16");
let n = DeepClone(m);
n.setMonth(6);
console.log(m.toLocaleDateString(), n.toLocaleDateString());

let o = new RegExp(/^[0-9]*$/);
let p = DeepClone(o);
p = /^[a-zA-Z]*$/;
console.log(o, p);