/** Facebook interview questions */
const arr1 = [
  0,
  1,
  2,
  [
    [3, 4],
    [6, [3, 4]],
  ],
];

function flatten(arr, depth = 1) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      result = result.concat(flatten(item, depth - 1));
    } else {
      result.push(item);
    }
  });
}

flatten(arr1, 4);

function groupBy(array, cb) {
  const map = {};

  if (!cb) return;

  array.forEach((val, i) => {
    const key = cb(val);
    map[key] = map[key] || [];
    map[key].push(val);
  });
  return map;
}
const res = groupBy([6.1, 4.2, 6.3], Math.floor);

console.log(res);

function reduce(arr, cb, initAcc) {
  let acc = initAcc;
  arr.forEach((val, i) => {
    acc = cb(acc, val, i);
  });
  return acc;
}

const store = new DomStore();
const a = documen.getElementById("test");

store.set(a, 3);
store.has(a); // return true
store.get(a);

class DomStore {
  constructor() {
    this.nodes = {};
    this.count = 0;
  }

  set(node, val) {
    node.id = node.id || this.count++;
    this.nodes[node.id] = val;
  }

  get(node) {
    return this.nodes[node.id];
  }
}
