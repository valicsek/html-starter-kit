module.exports = {
  dev: {
    source: 'dev',
    style: {
      file_type: 'css'
    }
  },
  build: {
    source: 'build',
    assets_destination: 'assets',
    mangle_top_level: true
  }
}
