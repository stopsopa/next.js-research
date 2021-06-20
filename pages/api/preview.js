// A simple example for testing it manually from your browser.
// If this is located at pages/api/preview.js, then
// open /api/preview from your browser.

/**
 * https://nextjs.org/docs/advanced-features/preview-mode
 */
export default function handler(req, res) {
  res.setPreviewData({})
  res.end('Preview mode enabled')
}