/**
 * Default config for `semantic-release`.
 * Extendable.
 */
module.exports = {
  branches: [
    'master',
    'next',
    {name: 'beta', prerelease: true},
    {name: 'alpha', prerelease: true}
  ],
  // Default list of plugins is in `get-config.js`
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    // '@semantic-release/changelog', // let's skip changelog, as github releases can be used instead
    '@semantic-release/npm',
    // '@semantic-release/git', // let's use github instead
    '@semantic-release/github',
  ],
}
