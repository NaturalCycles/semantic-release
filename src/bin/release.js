#!/usr/bin/env node

const path = require('node:path')
const fs = require('node:fs')
const { parseArgs } = require('node:util')

main().catch(err => {
  console.error(err)
  process.exit(1)
})

async function main() {
  const { config: configPath }  = parseArgs({
    options: {
      config: {
        type: 'string',
        descr: 'Path to config file',
      },
    },
  }).values
  // console.log({configPath})

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
  const { default: semanticRelease } = await import('semantic-release')
  await semanticRelease(config)
}
