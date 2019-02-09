import 'whatwg-fetch';

const UNABLE_TO_PROCESS_REQUEST = 'Unable to process request';

let Api = {
  /**
   * Fetch using the GET method
   * @param  {string} endpoint              The endpoint with no beginning slash, example "login" or "login/test"
   * @param  {object} headers               The headers to pass along with call
   * @param  {object} data                  The body data to be passed
   */

  get(apiRoot, endpoint, data, readRequestVerificationTokenHeader) {
    return new Promise((resolve, reject) => {
      let timestamp = Date.now();
      let cachebust = endpoint.indexOf('?') > -1 ? '&_=' + timestamp : '?_=' + timestamp;
      fetch(`${apiRoot}${endpoint}${cachebust}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        body: data,
        Pragma: 'no-cache',
        Expires: '0',
      }).then(response => {
        checkOk(response, readRequestVerificationTokenHeader, resolve, reject);
      });
    });
  },

  /**
   * Fetch using the POST method
   * @param  {string} endpoint              The endpoint with no beginning slash, example "login" or "login/test"
   * @param  {object} headers               The headers to pass along with call
   * @param  {object} data                  The body data to be passed
   * @param  {string} csrf                  The csrf token that needs to be sent in custom header
   */

  post(apiRoot, endpoint = '', data, csrf = '') {
    let headers;
    if (csrf && csrf.length > 0) {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Verification-Token': csrf,
        'X-Requested-With': 'XMLHttpRequest',
      };
    } else {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      };
    }
    return new Promise((resolve, reject) => {
      fetch(`${apiRoot}${endpoint}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: headers,
        body: JSON.stringify(data),
      }).then(response => {
        checkOk(response, false, resolve, reject);
      });
    });
  },
};

export function checkErrorStatus(response, resolve, reject) {
  // anything above 403 we don't care about json just reject with generic error for 404, 500 etc
  if (response.status > 403) {
    return reject(new Error(UNABLE_TO_PROCESS_REQUEST));
  }

  response.json().then(json => {
    if (json && json.error && json.error.message) {
      return reject(new Error(json.error.message));
    } else {
      return reject(new Error(UNABLE_TO_PROCESS_REQUEST));
    }
  });
}

export function checkOk(response, readRequestVerificationTokenHeader, resolve, reject) {
  if (response.ok) {
    if (readRequestVerificationTokenHeader) {
      const requestVerificationHeaderName = 'x-request-verification-token';
      const csrfToken = response.headers.get(requestVerificationHeaderName);

      response.json().then(json => {
        if (json) {
          // if 200 has an error property. not ideal but we have to handle old Definitive calls
          if (json.error) {
            handleOkError(json, reject);
          }

          if (typeof csrfToken === 'string') {
            json.csrfToken = csrfToken;
          }

          return resolve(json);
        } else {
          return resolve(true);
        }
      });
    } else {
      response.json().then(json => {
        if (json) {
          if (json.error) {
            handleOkError(json, reject);
          }

          return resolve(json);
        } else {
          return resolve(true);
        }
      });
    }
  } else {
    return checkErrorStatus(response, resolve, reject);
  }
}

export function handleOkError(jsonResponse, reject) {
  // if 200 has an error property. not ideal but we have to handle old Definitive calls
  const errorMessage = jsonResponse.hasOwnProperty('message')
    ? jsonResponse.message
    : jsonResponse.error;

  if (errorMessage && errorMessage.toLowerCase() !== 'internal error occurred') {
    return reject(new Error(errorMessage));
  } else {
    return reject(new Error(UNABLE_TO_PROCESS_REQUEST));
  }
}

export * from './apiRoutes';
export default Api;
