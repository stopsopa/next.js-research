/**
 * var r = await fetch('/api/user/67'); console.log(await r.json())
 */
export default function handler(req, res) {

  const {
    id
  } = req.query;

  res
    .status(200)
    .json({
      id,
      name: 'John Doe',
    })
  ;
}