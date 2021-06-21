
export default function handler(req, res) {

  /**
   * https://nextjs.org/docs/advanced-features/preview-mode#clear-the-preview-mode-cookies
   */
  res.clearPreviewData();

  const before = res.getHeaderNames().reduce((acc, n) => {
    acc[n] = res.getHeader(n);
    return acc;
  }, {})['set-cookie'];

  res.removeHeader('set-cookie');

  const after = before.map(
    v => v
      .replace(/ HttpOnly;/, '')
      .replace(/ Secure;/, '')
      .replace(/ SameSite=None/, ' SameSite=Lex')
  );

  res.setHeader('set-cookie', after);

  res.end('done')
}