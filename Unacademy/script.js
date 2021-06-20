const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const createStore = (reducer, initialState, enhancer) => {
  let state = initialState;

  if (enhancer) {
    // if enhancer is passed directly call it
    enhancer(createStore)(reducer, initialState);
  }

  const listeners = [];
  updateState = (action) => {
    state = reducer(state, action);
    listeners.forEach((listner) => {
      listner(action);
    });
  };
  return {
    getState: () => {
      return state;
    },
    dispatch: (action) => {
      updateState(action);
    },
    subscribe: (listner) => {
      listeners.push(listner);
      // return unsubscribe function
      return () => {
        const index = listeners.findIndex(listner);
        listeners.splice(index, 1);
      };
    },
  };
};

const initialValue = 0;

function compose() {
  var funcs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    funcs[_i] = arguments[_i];
  }
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  // console.log(funcs);
  // const a = funcs.splice(0);

  // return funcs.forEach((b) => {
  //   a = (...args) => {
  //     a(b(...args));
  //   };
  // });
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    let dispatch = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed. " +
          "Other middleware would not be applied to this dispatch."
      );
    };

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
};

const fn1 = (storeApii) =>
  function fnteset1(next) {
    return (action) => {
      console.log("here in fun 1");
      next();
    };
  };

const fn2 = (storeApii) =>
  function fnteset2(next) {
    return (action) => {
      console.log("here in fun 2");
      next();
    };
  };

const fn3 = (storeApii) =>
  function fnteset3(next) {
    return (action) => {
      console.log("here in fun 3");
      next();
    };
  };

const enhancer = applyMiddleware(fn1, fn2, fn3);
const { getState, dispatch } = enhancer(createStore)(reducer, initialValue);
// dispatch({ type: "INCREMENT" });

const fnb1 = (x) => {
  console.log("function 1 called", x);
  return "test";
};

const fnb2 = (x) => {
  console.log("function2 called", x);
  return "abcd";
};

const fnb3 = (x) => {
  console.log("function3 called", x);
  return "fdsaf";
};

const output = compose(fnb1, fnb2, fnb3);
output();
