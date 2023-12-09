const path = require('path');
const nodeExternals = require('webpack-node-externals');   

module.exports = {
   entry: {
    main:'./index.js'
  }, 
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath:"/",
    clean: true,
  },
  mode: 'development',
  target:'node',
  externals: [nodeExternals()],   
  module:{
    rules:[
        {
            test:/\.js$/,
            exclude: /node_modules/,
            loader:"babel-loader",
        }
    ]
  }
};