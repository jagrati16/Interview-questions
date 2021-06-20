const newFn = () => {
  const handlers = [];
  const latestAPIid = 0;

  const handleRes = (type, res) => {
    handlers.forEach((handler) => {
      if (type === "success") {
        handler.onSuccess(res);
      } else {
        handler.onFailure(res);
      }
    });
    handlers = [];
    latestAPIid = 0;
  };

  return function (dataFetcher) {
    return new Promise((resolve, reject) => {
      handlers.push({
        onSuccess: resolve,
        onFailure: reject,
      });
      latestAPIid++;
      const id = latestAPIid;
      dataFetcher()
        .then((res) => {
          if (id === latestAPIid) {
            handleRes("success", res);
          }
        })
        .catch((err) => {
          handleRes("err", err);
        });
    });
  };
};
const useFn = newFn();

// newFn().then((res) => {})
// newFn().then((res) => {})
