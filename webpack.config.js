var debug = process.env.NODE_ENV !== 'production';
var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
  context: path.join( __dirname, 'src' ),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './js/index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [ 'react', 'es2015', 'stage-0' ]
        }
      },
      {
        test: /\.json/,
        loaders: [ 'json-loader' ]
      }
    ]
  },
  output: {
    path: path.join( __dirname, 'public' ),
    filename: 'bundle.min.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ],
  resolve: {
    extensions: [ '', '.js' ],
    root: path.join( __dirname, 'src/js' )
  }
};
