
export default function handler(req, res) {

  /**
   * https://nextjs.org/docs/advanced-features/preview-mode#clear-the-preview-mode-cookies
   */
  res.clearPreviewData();

  res.end('done')
}