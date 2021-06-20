import React from "react";

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentange: 0,
    };
  }

  componentDidMount() {
    if (this.props.state === "inProgress") {
      setTimeout(() => {
        this.setState({ percentange: 100 });
      }, 10);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.state !== this.props.state &&
      this.props.state === "inProgress"
    ) {
      setTimeout(() => {
        this.setState({ percentange: 100 });
      }, 10);
    }
  }

  onTransitionEnd = () => {
    const { index } = this.props;
    this.props.onTransitionEnd(index);
  };

  render() {
    return (
      <div className="progress-bar" onTransitionEnd={this.onTransitionEnd}>
        <div
          className="inner"
          style={{ width: `${this.state.percentange}%` }}
        />
      </div>
    );
  }
}

import React from "react";
import ReactDOM from "react-dom";
import ProgressBar from "./ProgressBar";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      progressBars: [],
    };
  }

  createNew = () => {
    const progressBars = [...this.state.progressBars];
    const { count } = this.state;
    if (count === 0) {
      progressBars.push("inProgress");
    } else {
      let tempCount = 0;
      progressBars.forEach((d) => {
        if (d === "inProgress") {
          tempCount++;
        }
      });
      if (tempCount < 3) {
        progressBars.push("inProgress");
      } else {
        progressBars.push("pending");
      }
    }
    this.setState((prevState) => {
      return {
        count: prevState.count + 1,
        progressBars,
      };
    });
  };

  onTransitionEnd = (index) => {
    console.log("inside transition end", index);
    const bars = [...this.state.progressBars];
    bars[index] = "completed";
    let found = 0;
    for (let i = index + 1; i < bars.length; i++) {
      if (bars[i] === "pending" && !found) {
        bars[i] = "inProgress";
        found = 1;
      }
    }
    this.setState({
      progressBars: bars,
    });
  };

  renderProgressBars = () => {
    const { progressBars } = this.state;
    return progressBars.map((d, index) => {
      return (
        <ProgressBar
          state={d}
          index={index}
          onTransitionEnd={this.onTransitionEnd}
        />
      );
    });
  };

  render() {
    console.log(this.state.progressBars);
    return (
      <React.Fragment>
        <button onClick={this.createNew}>Add ProgressBar</button>
        {this.renderProgressBars()}
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// Uber

// A "TaskRunner" Constructor takes one argument, "concurrency", and exposes one method "push" on its prototype. The "push" method takes one argument "task" which is a "function":
// "task" functions that can be passed to the push method have the following signature:
// function exampleTask(done) { /* calls done() at some point */ }
// * Calling done signifies that a task is complete.
// * A requirement of a task is that is has to call done at some point.
// * done takes no arguments and merely signifies the task completion.
// Here are some examples of tasks:
function exampleSimpleTask(done) {
  setTimeout(() => {
    console.log("task done", new Date());
    done();
  }, 3000);
}

// function exampleXhrTask(done) {
//   makeARequestSomehow('http://website.api/foo', function (err, res) {
//     doSomethingWithRes(res);
//     done();
//   }
// }
// Passing a task to a push method of a TaskRunner instance should immediately execute (call/run/invoke) the task, unless the number of currently running tasks exceeds the concurrency limit.
// If the number of tasks exceeds concurrency limit (which is passed to the TaskRunner constructor), the pushed task should wait until one of the running tasks has finished (has called done).
// Here's an example:

class TaskRunner {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.runningTasks = 0;
    this.waitingTasks = [];
    this.done = this.done.bind(this);
  }

  done() {
    this.runningTasks--;
    if (this.waitingTasks.length > 0) {
      const task = this.waitingTasks[0];
      task(this.done);
      const newList = [];
      if (this.waitingTasks.length === 1) {
        this.waitingTasks = [];
      } else {
        for (let i = 1; i < this.waitingTasks.length; i++) {
          newList.push(this.waitingTasks[i]);
        }
        this.waitingTasks = newList;
      }
    }
  }

  push(task) {
    if (this.runningTasks < 3) {
      this.runningTasks++;
      task(this.done);
    } else {
      this.waitingTasks.push(task);
    }
  }
}

// function TaskRunner(concurrency) {
//   this.concurrency = concurrency;
//   this.runningTasks = 0;
//   this.waitingTasks = [];
//   this.done = () => {
//     this.runningTasks--;
//     if (this.waitingTasks.length > 0) {
//         const task = this.waitingTasks[0]
//         task(this.done)
//         const newList = [];
//         if (waitingTasks.length === 1) {
//             this.waitingTasks = [];
//         } else {
//             for(let i = 1; i < this.waitingTasks.length; i++) {
//                 newList.push(this.waitingTasks[i])
//             }
//             this.waitingTasks = newList;
//         }
//     }
//   }
// }

// TaskRunner.prototype.push = function push(task) {
//     if (this.runningTasks < 3) {
//         task(this.done);
//     } else {
//         this.waitingTasks.push(task)
//     }
// }

var r = new TaskRunner(3);
// use the exampleSimpleTask from above;

r.push(exampleSimpleTask); // executes immediately
r.push(exampleSimpleTask); // executes immediately
r.push(exampleSimpleTask); // executes immediately
r.push(exampleSimpleTask); // should wait until one of the running tasks completes
r.push(exampleSimpleTask); // should wait until one of the running tasks completes
// ...

/----------------------/;
// EventLib.pub('Foo', {'a': 'Bar'} );

// EventLib.sub('Foo',  (evt, data) => {
//     console.log(data);
// });

class EventLib {
  constructor() {
    this.subscribers = {};
  }

  pub(event, data) {
    const subscribers = this.subscribers[event];
    if (subscribers.length > 0) {
      subscribers.forEach(function (s) {
        s(event, data);
      });
    }
  }

  sub(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }
}

const eventLib = new EventLib();
eventLib.sub("Foo", (evt, data) => {
  console.log(data);
});
eventLib.pub("Foo", { a: "Bar" });

/------------------------/;

// implement reduce

// reduce((acc, d) =>  ,  )

Array.prototype.reduceNew = function (callback, acc) {
  this.forEach(function (d) {
    acc = callback(acc, d);
  });
  return acc;
};

const a = [1, 2, 3];
console.log(a.reduceNew((a, b) => a + b, 3)); // 9
