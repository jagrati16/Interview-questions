// async memoisation

function memoize(fn, hasher = (v) => v) {
  const cache = {};
  const queue = [];
  return function (...args) {
    const cb = args.pop();
    const key = hasher(args);
    if (cache[key]) {
      return cb.apply(this, cache[key]);
    }
    if (queue[key]) {
      queue[key].push(cb);
      return;
    }
    queue[key] = [cb];
    fn.call(this, ...args, (err, ...resultArgs) => {
      if (!err) {
        cache[key] = resultArgs;
      }
      const callbacks = queue[key];
      delete queue[key];
      if (callbacks) {
        callbacks.forEach((qcb) => qcb(err, ...resultArgs));
      }
    });
  };
}

const arr = [[1], [[2]], [[[3], 4]]];

function arrayFlatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      res = res.concat(arrayFlatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

console.log(arrayFlatten(arr));

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

const obj = {
  a: "jack",
  b: {
    c: "sparrow",
    d: {
      e: "hahaha",
    },
  },
};

const result = {};

function flattenObject(obj, key) {
  Object.entries(obj).forEach(([k, v]) => {
    const mapkey = `${key}.${k}`;
    if (v instanceof Object) {
      flattenObject(v, mapkey);
    } else {
      result[mapkey] = v;
    }
  });
}

flattenObject(obj, "test");

class Stream {
  constructor() {
    this.subscribers = [];
  }

  subscribe = (subscriber) => {
    this.subscribers.push(subscriber);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== subscriber);
    };
  };

  push = (value) => {
    this.subscribers.forEach((s) => {
      s(value);
    });
  };
}

const z = new Stream();
z.subscribe((value) => console.log(value));
z.subscribe((value) => console.log(value * 2));
z.subscribe((value) => console.log(value * 3));
z.push(2);

function Parent(engine) {
  this.engine = engine;
}

Parent.prototype.getEngine = function () {
  return `my car is ${this.engine}`;
};

function Car(engine) {
  this.car = car;
  Parent.call(null, engine);
}
