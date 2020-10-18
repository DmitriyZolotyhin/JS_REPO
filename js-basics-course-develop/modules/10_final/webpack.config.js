const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: "development", //"production"
  entry: { index: path.resolve(__dirname, "src", "index.js") },

  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'script.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      }
    ]
  },

  plugins: [

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['./public/*.html'],
      server: { baseDir: ['./public'] }
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
  ],
}
