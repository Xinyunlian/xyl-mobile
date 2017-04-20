const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true
}).listen(8888, function cb(err) {
    if (err) {
        throw err
    }
    console.log('Listening at http://localhost:8888/')
});