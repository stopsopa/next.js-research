/**
 * var r = await fetch('/api/yaml/abc'); console.log(JSON.stringify(await r.json(), null, 4))
 */

const yamlhandler = require('../../../yamlapi/yamlhandler');

/**
 * var r = await fetch('/api/yaml/abc'); console.log(await r.json())
 */
export default async function handler(req, res) {

  let {
    file,
  } = req.query;

  try {

    const data = await yamlhandler(file);

    res.json(data);
  }
  catch (e) {

    return res
      .status(500)
      .json({
        error: String(e),
      })
    ;
  }
}