#!/usr/bin/env node

const semanticRelease = require('semantic-release')
const yargs = require('yargs')
const path = require('path')

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
  const config = configPath
    ? require(path.resolve(cwd, configPath))
    : require('../../cfg/release.config') // defaultConfig
  // console.log(config) // debug
  await semanticRelease(config)
}
