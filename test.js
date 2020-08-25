const utils = require("./utils");

const checkType = utils.checkType;
const formatDate = utils.formatDate;
const isEqual = utils.isEqual;
const compose = utils.compose;

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