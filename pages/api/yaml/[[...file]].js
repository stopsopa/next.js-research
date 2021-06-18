/**
 * var r = await fetch('/api/yaml/dir/file'); console.log(await r.json())
 */
const path = require('path');

const fs = require('fs');

const yaml = require('js-yaml');

import getConfig from 'next/config'

const yamldir = path.resolve(getConfig().serverRuntimeConfig.root, 'yamlapi');

if ( ! fs.existsSync(yamldir) ) {

  throw new Error(`Directory '${yamldir}' doesn't exist`);
}

if ( ! fs.statSync(yamldir).isDirectory() ) { // is directory is_dir isdirectory

  throw new Error(`'${yamldir}' is not a directory`);
}

/**
 * var r = await fetch('/api/yaml/abc'); console.log(await r.json())
 */
export default function handler(req, res) {

  let {
    file,
  } = req.query;

  let error;

  if ( file.includes('..') ) {

    error = `${file} wrong path`;
  }

  if ( ! Array.isArray(file)) {

    error = `file query param is not an array`;
  }

  if ( file.length === 0 ) {

    error = `file query param is an empty array`;
  }

  let finalfile = path.join.apply(undefined, file);

  finalfile = path.resolve(yamldir, `${finalfile}.yaml`);

  if ( ! error && ! fs.existsSync(finalfile) ) {

    error = `Yaml file '${finalfile}' doesn't exist`;
  }

  let data;

  if ( ! error ) {

    try {

      data = yaml.load(fs.readFileSync(finalfile, 'utf8'));

    } catch (e) {

      error = String(e);
    }
  }

  if (error) {

    return res
      .status(500)
      .json({
        error,
      })
    ;
  }

  res
    .json({
      data
    })
  ;
}