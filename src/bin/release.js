#!/usr/bin/env node

const semanticRelease = require('semantic-release')
const config = require('../../cfg/release.config')

semanticRelease(config).catch(err => {
  console.error(err)
  process.exit(1)
})
