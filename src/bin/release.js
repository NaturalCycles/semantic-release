#!/usr/bin/env node

const semanticRelease = require('semantic-release')
const yargs = require('yargs')
const path = require('path')
const fs = require('fs')

main().catch(err => {
  console.error(err)
  process.exit(1)
})

async function main() {
  const {config: configPath} = yargs.options({
    config: {
      type: 'string',
      descr: 'Path to config file',
    }
  }).argv

  const cwd = process.cwd()

  const localConfig = `./release.config.js`
  let config

  if (configPath) {
    config = require(path.resolve(cwd, configPath))
  } else if (fs.existsSync(localConfig)) {
    config = require(path.resolve(cwd, localConfig))
  } else {
    config = require('../../cfg/release.config') // defaultConfig
  }

  // console.log(config) // debug
  await semanticRelease(config)
}
