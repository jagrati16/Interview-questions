// Question 1
// Implement the mouseTracker observable so that the observers handleEvent's will be called on mouse move

class MouseTrackerObservable {
  constructor() {
    this.observers = [];

    document.addEventListener("mousemove", (e) => {
      this.observers.forEach((observer) => {
        observer.handleEvent(e.clientX, e.clientY);
      });
    });
  }

  addObserver(observer) {
    this.observers.push(observer);
  }
}

const mouseTracker = new MouseTrackerObservable();
const box = document.getElementById("observer-pattern");
const transformDiv = (x, y) => {
  box.style.transform = `translate(${x}px, ${y}px)`;
};

const observer = {
  handleEvent: transformDiv,
};

// Question 2
// Implement a `delay` observable `operator` which will delay the it's observers handleEvents from firing

const delay = (observable) => ({
  addObserver: (observer) => {
    observable.addObserver({
      handleEvent: (...args) => {
        setTimeout(() => {
          observer.handleEvent(...args);
        }, 1000);
      },
    });
  },
});

delay(mouseTracker).addObserver(observer);
