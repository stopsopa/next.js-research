
import qs from 'querystring'

const tool = req => new Promise( ( resolve, reject ) => {

  let postBody = '';

  req.on( 'data', ( data ) => {
    postBody += data.toString();
  });

  req.on( 'end', () => {
    resolve(qs.parse( postBody ));
  } );
});


// log.dump({
//   headers: req.headers['content-type'],
//   eq: req.headers['content-type'] === 'application/x-www-form-urlencoded'
// })
// <host> [String]: >lh:3001< len: 7
// <connection> [String]: >keep-alive< len: 10
// <content-length> [String]: >42< len: 2
// <pragma> [String]: >no-cache< len: 8
// <cache-control> [String]: >no-cache< len: 8
// <upgrade-insecure-requests> [String]: >1< len: 1
// <content-type> [String]: >application/x-www-form-urlencoded< len: 33
tool.check = req => req.headers['content-type'] === 'application/x-www-form-urlencoded';

module.exports = tool;