
// yarn add nlab node-fetch cross-fetch

const isNode        = require('nlab/isNode');

const negotiatePort = require('nlab/negotiatePort');

const isObject      = require("nlab/isObject");

const log           = (function(){try{return console.log}catch(e){return()=>{}}}());

const th = msg => new Error(`transport.js error: ${msg}`);

let fakeFetch;

let origin;

/**
  PROTOCOL="http"
  HOST="0.0.0.0"
  PORT="8080"
*/
function setFetch(PROTOCOL, HOST, PORT) {

  if ( ! /^https?$/.test(PROTOCOL) ) {

    throw th(`PROTOCOL (${PROTOCOL}) don't match /^https?$/`);
  }

  if ( typeof HOST !== 'string' ) {

    throw th(`HOST (${HOST}) is not a string`);
  }

  if ( ! HOST.trim() ) {

    throw th(`HOST is an empty string`);
  }

  origin = `${PROTOCOL}://${HOST}` + negotiatePort(PROTOCOL, PORT, ':');
}

if ( isNode ) {

  fakeFetch = eval('require')('node-fetch');
}
else {

  (function (old) {

    const fetchPolyfill = require('cross-fetch');

    fakeFetch = window.fakeFetch = (url, opt) => {

      log(`ajax fetch polyfill ${url}`);

      return fetchPolyfill(url, opt);
    };

    if (old) {

      window.fetch = (url, opt) => {

        log(`native fetch ${url}`);

        return old(url, opt);
      };
    }
  })(window.fetch);
}

const fetchData = async (path, options) => {

  if (typeof options === "undefined") {

    options = {};
  }

  if ( origin && ! /^https?:\/\//.test(path) ) {

    path = origin + path;
  }

  log(`fetchData path: ${path}`);

  options.headers = {
    "x-requested-with": "fetch",
    ...options.headers,
  };

  const { delay, native, ...rest } = options;

  options = rest;

  if (Number.isInteger(delay) && delay > 0) {

    await new Promise(res => setTimeout(res, delay));
  }

  if ( native && ! isNode && window.fetch) {

    return window.fetch(path, options);
  }

  return fakeFetch(path, options);
};

const fetchJson = (path, options) => {

  if (typeof options === "undefined") {

    options = {};
  }

  options.headers = {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
    ...options.headers,
  };

  if (isObject(options.body) || Array.isArray(options.body)) {

    options.body = JSON.stringify(options.body || {}, null, 4);

    options.method = options.method || "POST";
  } else {

    options.method = options.method || "GET";
  }

  const { rawResponse, ...rest } = options;

  const res = fetchData(path, rest);

  if (rawResponse) {

    return res;
  }

  return res.then(res => res.json());
};

if ( ! isNode ) {

  window.fetchData = fetchData;

  window.fetchJson = fetchJson;
}

module.exports = {
  fetchData,
  fetchJson,
  setFetch,
}