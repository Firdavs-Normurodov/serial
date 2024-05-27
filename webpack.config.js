const path = require("path"); // Import path module for resolving file paths

module.exports = {
  mode: "development",
  entry: "./src/js/script.js",
  output: {
    path: path.resolve(__dirname, "dist/js"), // Use path.resolve to generate absolute paths
    filename: "bundle.js",
  },
  watch: true,
  devtool: "source-map", // Corrected typo here
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|browser_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env", // Corrected typo here
                {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage",
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
