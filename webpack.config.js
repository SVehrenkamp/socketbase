var path = require('path');
module.exports = {
    entry: './public/js/app',
    output: {
        path: __dirname,
        filename: 'public/dist/js/bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                presets: ['babel-preset-es2015']
              }
            }
        ]
    }
};
