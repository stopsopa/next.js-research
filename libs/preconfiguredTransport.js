
const isNode = require('nlab/isNode');

const transport = require('./transport');

const {
  setFetch,
} = transport;

const th = msg => new Error(`preconfiguredTransport.js error: ${msg}`);

if (isNode) {

  // NEXT_PROTOCOL=http
  // NEXT_HOST==0.0.0.0
  // NEXT_PORT=3001
  if ( ! /^https?$/.test(process.env.NEXT_PROTOCOL) ) {

    throw th(`process.env.NEXT_PROTOCOL don't match /^https?$/`);
  }

  if ( ! process.env.NEXT_HOST.trim() ) {

    throw th(`process.env.NEXT_HOST is an empty string`);
  }

  if ( ! /^\d+$/.test(process.env.NEXT_PORT) ) {

    throw th(`process.env.NEXT_PORT don't match /^\\d+$/`);
  }

  setFetch(process.env.NEXT_PROTOCOL, process.env.NEXT_HOST, process.env.NEXT_PORT);
}

module.exports = transport;