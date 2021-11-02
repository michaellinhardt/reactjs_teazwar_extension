const path = require('path')

module.exports = {
  // Source files
  webpack: path.resolve(__dirname, '../webpack'),

  // Source files
  src: path.resolve(__dirname, '../src'),

  // Source files
  entry: path.resolve(__dirname, '../src/entry'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),
}
