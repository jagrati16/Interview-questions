/**
 * Performance wise there is almost no difference between CSS and JS animation frames
 * When browser tab is inactive the animation pauses in both
 * https://github.com/alexreardon/raf-schd
 */

const start = document.getElementById("start");
const stop = document.getElementById("stop");

let id;
const draw = () => {
  const div = document.createElement("div");
  div.classList.add("my-animated-div");
  document.body.appendChild(div);
  id = requestAnimationFrame(draw);
};

start.addEventListener("click", () => {
  draw();
});

stop.addEventListener("click", () => {
  cancelAnimationFrame(id);
});

/**
 *  When we want to get ultra smooth animation framees
 *  draw () {
 *      setTimeout(draw, 1000/60) // 60frames per second
 *  }
 *  draw()
 *
 */

// Pollyfill of requestAnimationFrame
(function () {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (cb, element) {
      let currentTime = new Date().getTime();
      let timeToCall = Math.max(0, 16 - (currentTime - lastTime));
      id = setTimeout(() => {
        cb(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => {
      clearTimeout(id);
    };
  }
})();

/** RequestAnimationFrame Throttling */
function refScheduled(fn) {
  let lastArgs = [];
  let frame;
  const wrapperFn = function (...args) {
    // Always capture the latest value
    lastArgs = args;

    /// There is already a frame queued
    if (frame) {
      return;
    }
    // Schedule a new frame
    frame = requestAnimationFrame(() => {
      fn.call(this, ...lastArgs);
      frame = null;
    });
  };

  // Adding cancel property to result function
  wrapperFn.cancel = () => {
    if (!frame) {
      return;
    }
    cancelAnimationFrame(frame);
    frame = null;
  };
}
