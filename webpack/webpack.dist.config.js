const path = require('path');
const webpack = require('webpack');
// const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const replaceAppPath = require('./replaceAppPath');
const root = path.join(__dirname, '../', '');

module.exports = function (env) {

    const version = env.version || '';

    return {
        entry: ["babel-polyfill", "./src/App.tsx"],
        devtool: 'source-map',
        output: {
            path: path.join(root, 'build'),
            filename: 'App.[hash].js',
            // filename: 'App.js',
        },
        resolve: {
            alias: {
                'react': 'preact-compat',
                'react-dom': 'preact-compat'
            },
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                    exclude: [/node_modules/, /build/],
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            // new CommonsChunkPlugin({
            //     filename: "commons.js",
            //     name: "commons"
            // }),
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     },
            //     except: ['$super', '$', 'exports', 'require']
            // }),
            replaceAppPath
        ]
    };
};

