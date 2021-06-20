// Debounce Implementation

function debounce(fn, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn.apply(context, args), wait);
  };
}

Function.prototype.myBind = function () {
  const [context, ...params] = arguments;
  const fn = this;
  return function () {
    return fn.call(context, ...params, ...arguments);
  };
};

class MyPromise {
  constructor(cb) {
    this.state = "PENDING";
    this.handlers = [];
    try {
      cb(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve = (data) => {
    this.setResult(data, "RESOLVED");
  };

  reject = (data) => {
    this.setResult(data, "REJECTED");
  };

  isThenable = (data) => {
    if (typeof data === "object" && typeof data.then === "function") {
      return true;
    }
    return false;
  };

  setResult = (result, state) => {
    const set = () => {
      if (this.state !== "PENDING") {
        return null; // do not set result if promise is already fulfilled
      }
      if (this.isThenable(result)) {
        // adding .then to the end of the change and calling resolve or reject with promise result
        return result.then(this.resolve, this.reject);
      }
      this.value = result;
      this.state = state;

      this.executeHandlers();
    };
    setTimeout(set, 0); // making promise asynchronous
  };

  executeHandlers = () => {
    if (this.state === "PENDING") {
      return null;
    }
    // executeHandlers only when the promise is resolved or rejected
    this.handlers.forEach(({ onSuccess, onFail }) => {
      if (this.state === "RESOLVED") {
        onSuccess(this.value);
      } else if (this.state === "REJECTED") {
        onFail(this.value);
      }
    });
    this.handlers = [];
  };

  attachHandlers = (handler) => {
    this.handlers = [...this.handlers, handler];
    this.executeHandlers();
  };

  then = (scb, ecb) => {
    return new MyPromise((resolve, reject) => {
      this.attachHandlers({
        onSuccess: (value) => {
          if (!scb) {
            resolve(value);
          }
          return resolve(scb(value));
        },
        onFail: (value) => {
          if (!ecb) {
            reject(value);
          }
          return reject(ecb(value));
        },
      });
    });
  };

  catch(ecb) {
    this.then(() => {}, ecb);
  }

  finally(cb) {
    return new myPromise((resolve, reject) => {
      let isRejected;
      let value;
      return this.then(
        (v) => {
          isRejected = false;
          value = v;
          return cb();
        },
        () => {
          isRejected = true;
          value = v;
          return cb();
        }
      ).then(() => {
        if (isRejected) {
          return reject(val);
        }
        return resolve(val);
      });
    });
  }

  // static methods

  static resolve = (value) => {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  };

  static reject = (value) => {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  };

  static all = (promises) => {
    return new MyPromise((resolve, reject) => {
      const results = [];
      const count = 0;
      return promises.forEach((p, index) => {
        return MyPromise.resolve(p)
          .then((r) => {
            count++;
            results[index] = r;
            if (results.length === count) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  };
}
