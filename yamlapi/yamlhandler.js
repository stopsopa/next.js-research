/**
 * var r = await fetch('/api/yaml/abc'); console.log(JSON.stringify(await r.json(), null, 4))
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
module.exports = function (pathArray) {

  if (typeof pathArray === 'string') {

    pathArray = pathArray.split('/')
  }

  let error;

  if ( pathArray.includes('..') ) {

    error = `pathArray '${pathArray}' wrong path`;
  }

  if ( ! Array.isArray(pathArray)) {

    error = `pathArray query param is not an array`;
  }

  if ( pathArray.length === 0 ) {

    error = `pathArray is an empty array`;
  }

  let finalfile = path.join.apply(undefined, pathArray);

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

    return Promise.reject(error);
  }

  return Promise.resolve(data);
}