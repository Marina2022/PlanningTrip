const path = require(`path`);
const momentLocalesPlugin = require(`moment-locales-webpack-plugin`)

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `source-map`,
  devServer: {
    static: path.join(__dirname, `public`),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new momentLocalesPlugin({
      localesToKeep: ['en-gb'],
    })
  ]
};
