/**
 * Optional catch all API routes https://nextjs.org/docs/api-routes/dynamic-api-routes#optional-catch-all-api-routes
 *
 * var r = await fetch('/api/catchall/67/and/more'); console.log(JSON.stringify(await r.json(), null, 4))
 * var r = await fetch('/api/catchall/67'); console.log(JSON.stringify(await r.json(), null, 4))
 * var r = await fetch('/api/catchall'); console.log(JSON.stringify(await r.json(), null, 4))
 */
export default function handler(req, res) {

  const {
    slug
  } = req.query;

  res
    .status(200)
    .json({
      slug,
      name: 'John Doe',
    })
  ;
}