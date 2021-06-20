import React, { useState, useRef, useEffect } from "react";

function Counter({ initialCount }) {
  const [count, setState] = useState(initialCount);
  const timerId = useRef(null);

  useEffect(() => {
    if (count === 0) {
      clearInterval(timerId.current);
    }
  }, [count]);

  const startTimer = () => {
    if (!timerId.current) {
      timerId.current = setInterval(() => {
        setState((count) => (count === 0 ? initialCount : count - 1));
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setState(initialCount);
  };

  return (
    <div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>reset</button>
      <div>{count}</div>
    </div>
  );
}

const App = () => {
  return <Counter initialCount={20} />;
};

export default App;
