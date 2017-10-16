// var webpack = require('webpack');  this is actually not needed
var path = require('path');

//This tells webpack where files will go to, the "dist" folder:
var DIST_DIR = path.resolve(__dirname, "dist");
//this tells webpack where the source code comes from, the "src" folder
var SRC_DIR = path.resolve(__dirname, "src");


var config = {
  entry:SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },
  module: {
    loaders: [
      {
        test: /\.js?/,  //regexp meaning "look at all .js files"
        include: SRC_DIR,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-2"]
        }
      }
    ]
  }
};

module.exports = config;
