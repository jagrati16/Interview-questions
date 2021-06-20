function currying(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn.call(null, ...args)
      : curried.bind(null, ...args);
  };
}

const sum = (a, b, c) => {
  return a + b + c;
};

const sumcurried = currying(sum);

console.log(sumcurried(1)(2)(3));

function test(x) {
  let sum = x;
  return function curriedFn(y) {
    if (y) {
      sum += y;
      return curriedFn;
    }
    return sum;
  };
}

console.log(test(1)(2)(8)());
