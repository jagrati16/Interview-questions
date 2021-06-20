function sum(x) {
  let currSum = x;
  return function test(z) {
    if (z !== undefined) {
      currSum += z;
      return test;
    }
    return {
      currSum,
    };
  };
}

// currying
const e = sum(1)(2)(3)();

console.log(e);

const car = {
  name: "test",
  model() {
    return `car name is ${this.name}`;
  },
};

const baz = Object.create(car);

console.log(baz.model());
