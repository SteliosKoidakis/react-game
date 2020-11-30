module.exports = {
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  setupFiles: [
    './src/setupTests.js',
  ],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
  ],
};
