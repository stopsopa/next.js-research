// A simple example for testing it manually from your browser.
// If this is located at pages/api/preview.js, then
// open /api/preview from your browser.

const { token } = require('../../../libs/jwtCookie');

/**
 * https://nextjs.org/docs/advanced-features/preview-mode
 *
 * This is little naive, normally I wouldn't generate token just on request, this is just for demo
 * So the browser will query this endpoint to get the valid token instead of generating it in browser
 * But normally on production it should be generated after checking session authentication in CMS
 */
export default function handler(req, res) {

  res.end(token.encode({}))
}