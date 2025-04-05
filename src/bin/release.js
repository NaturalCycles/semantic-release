#!/usr/bin/env node

import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { parseArgs } from 'node:util'

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
    config = (await import(resolve(cwd, configPath))).default
  } else if (existsSync(localConfig)) {
    config = (await import(resolve(cwd, localConfig))).default
  } else {
    config = (await import('../../cfg/release.config.js')).default // defaultConfig
  }

  // console.log(config) // debug
  const { default: semanticRelease } = await import('semantic-release')
  await semanticRelease(config)
}
