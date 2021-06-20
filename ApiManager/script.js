
// ApiManager.post(‘/url’, payload, accountId, { maxRetries }).then().catch()
// ApiManager.get(‘/url’, params, accountId, { maxRetries }).then().catch()
// ApiManager.put(‘/url’, payload, accountId, { maxRetries }).then().catch()

class ApiManager {
  constructor() {
    this.headers = [];
    this.retryErrorCodes = ["400"];
  }

  generateUrl = (accountId, endpoint) => {
    return `http:${accountId}.com${endpoint}`;
  };

  getDelay = (delay) => {
    return delay * 2;
  };

  post = (endpoint, payload, accountId, options) => {
    const postHeaders = { test: "abc" };
    const url = this.generateUrl(accountId, endpoint);
    return this._request({
      method: "POST",
      url,
      headers: postHeaders,
      options,
    });
  };

  _request({ method, headers, url, payload, params, retryDelay = 2, options }) {
    const { maxRetries } = options;
    return fetch(url, {
      method,
      headers: { ...this.headers, ...headers },
      body: payload,
      params,
    })
      .then((response) => response.json())
      .catch((err) => {
        if (maxRetries === 0 || !this.retryErrorCodes.includes(err.code)) {
          throw new Error(err);
        } else {
          retryDelay = this.getDelay(retryDelay);
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this._request({ method, headers, url, payload, params, retryDelay = 2, options: {...options, maxRetries : maxRetries - 1} }).then(
                resolve,
                reject
              );
            }, retryDelay);
          });
        }
      });
  }
}


