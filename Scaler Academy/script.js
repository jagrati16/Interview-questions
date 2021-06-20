import "./style.css";

const front = document.getElementsByClassName("front")[0];

front.addEventListener("click", () => {
  front.classList.add("move-right");
});

var arrayList = ["a", "b", "c", "d", "e", "f"];
var b = arrayList;
arrayList.length = 0;
console.log(b);

(function () {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 1000);
  setTimeout(function () {
    console.log(3);
  }, 0);
  console.log(4);
})();

// 1, 4, 3, 2

function foo1() {
  return {
    bar: "hello",
  };
}

function foo2() {
  return;
  {
  }
}

Date.prototype.nextDay = function () {
  const d = new Date();
  return new Date(d.setDate(d.getDate() + 1));
};

const d = new Date();
console.log(d.nextDay());

var monica = {
  name: "Monica Geller",
  total: 400,
  deductMontlyFee: function (fee) {
    this.total = this.total - fee;
    return this.name + " remaining balance is " + this.total;
  },
};

var rachel = { name: "TEst Green", total: 1500 };

Function.prototype.mybind = function () {
  const [context, ...rest] = arguments;
  const fn = this;
  return function (...args) {
    return fn.call(context, ...rest, ...args);
  };
};

const newFn = monica.deductMontlyFee.mybind(rachel);

console.log(newFn(1200));
