const CracoAlias = require("craco-alias");
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // webpack: {
  //   plugins: {
  //     add: [
  //       new NodePolyfillPlugin({
  //         excludeAliases: ['console'],
  //       }),
  //     ]
  //   },
  // },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@mui/styled-engine": "./node_modules/@mui/styled-engine-sc",
        },
      },
    },
  ],
};
