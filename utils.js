/**
 * 一些工具类函数
 */


//类型判断
const checkType = {
  isNull: (val) => {
    return Object.prototype.toString.call(val) === "[object Null]";
  },
  isUndefined: (val) => {
    return Object.prototype.toString.call(val) === "[object Undefined]";
  },
  isArray: (val) => {
    return Object.prototype.toString.call(val) === "[object Array]";
  },
  isObject: (val) => {
    return Object.prototype.toString.call(val) === "[object Object]";
  },
  isNumber: (val) => {
    return Object.prototype.toString.call(val) === "[object Number]";
  },
  isString: (val) => {
    return Object.prototype.toString.call(val) === "[object String]";
  },
  isFunction: (val) => {
    return Object.prototype.toString.call(val) === "[object Function]";
  },
  getType: (val) => {
    let type = Object.prototype.toString.call(val);
    const arr = type.match(/\[object\s([\s\S]*)\]/);
    return arr[1];
  }
}


//日期格式化
const formatDate = (date, fmt = "yyyy-MM-dd hh:mm:ss") => {
  if (date) {
    date = new Date(date);
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")).substr(4 - RegExp.$1.length);
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, o[k].toString().length === 1 ? `0${o[k]}` : o[k]);
      }
    }
    return fmt;
  }
}

//判断两个对象相等
const isEqual = (a, b, aStack, bStack) =>{

  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b;

  // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
  if (a == null || b == null) return false;

  // 判断 NaN
  if (a !== a) return b !== b;

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  let type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;

  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack);
};

function deepEq(a, b, aStack, bStack) {
  // a 和 b 的内部属性 [[class]] 相同时 返回 true
  let className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b;
    case '[object Number]':
      if (+a !== +a) return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
  }
  let areArrays = className === '[object Array]';
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a != 'object' || typeof b != 'object') return false;
    let aCtor = a.constructor, bCtor = b.constructor;
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
    if (aCtor !== bCtor && !(checkType.isFunction(aCtor) && aCtor instanceof aCtor && checkType.isFunction(bCtor) && bCtor instanceof bCtor)
      && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
  }
  // 数组判断
  if (areArrays) {
    let length = a.length;
    if (length !== b.length) return false;
    while (length--) {
      if (!isEqual(a[length], b[length])) return false;
    }
  }else { //对象判断
    let keys = Object.keys(a), key;
    let length = keys.length;
    if (Object.keys(b).length !== length) return false;
    while (length--) {
      key = keys[length];
      if (!(b.hasOwnProperty(key) && isEqual(a[key], b[key]))) return false;
    }
  }
  return true;
}

/**
 * 组合函数
 * @param  {...any} args
 * 函数作为参数且该函数的返回值作为另一个函数的参数
 */
const compose = (...args) => {
  let start = args.length-1;
  return function(){
    let result = args[start].apply(this, arguments);
    let i = start - 1;
    while(i >= 0){
      result = args[i].call(this, result);
      i--;
    }
    return result
  }
}

const utils = {
  checkType,
  formatDate,
  isEqual,
  compose
}

module.exports = utils;