const { override, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addLessLoader({
    paths: [path.resolve(__dirname, 'node_modules')],
    javascriptEnabled: true,
  }),
  addWebpackAlias({
    '@root': path.resolve(__dirname, 'src'),
  }),
);
