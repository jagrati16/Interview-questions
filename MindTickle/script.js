// https://api.github.com/zen

// n - no. of unique strings this function should return
// c - concurrency level , no . of parallel connection that can be made to the api server

// example c=2 n=5

// getStrings(5,2).then(data => {
//   console.log(data);
// });

// first round https://docs.google.com/document/d/1YxvUzVdY18ovt5I73rEYAi-epd1eVu_PhmSWL14X2jM/edit

function fetchString() {
  return fetch("https://api.github.com/zen").then((response) => {
    if (response.status === 200) {
      return response.text();
    } else {
      throw new Error("");
    }
  });
}

async function sleep(d) {
  return new Promise((resolve) => {
    setTimeout(resolve, d);
  });
}

const getStrings = (uniqueStringCount, concurrentCount) => {
  return new Promise(async (resolve, reject) => {
    const result = [];
    while (result.length < uniqueStringCount) {
      for (let i = 0; i < concurrentCount; i++) {
        fetchString()
          .then((str) => {
            console.log(result, str, result.includes(str));
            if (!result.includes(str) && result.length < uniqueStringCount) {
              result.push(str);
            }
            if (result.length === uniqueStringCount) {
              resolve(result);
            }
          })
          .catch((err) => {});
      }
      await sleep(10000);
    }
  });
};

getStrings(3, 2).then((data) => {
  console.log(data);
});

/** Question 2 */
function heavyOperation(param) {
  console.log("heavy operation for : ", param);
  return param + "_Done";
}

function callItonce(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    } else {
      const result = fn.call(this, ...args);
      cache[key] = result;
      return result;
    }
  };
}

const newFn = callItonce(heavyOperation);

console.log(newFn("test"), "result 1");
console.log(newFn("test"), "result 2");
console.log(newFn("abcd"), "result 3");
("use strict");
