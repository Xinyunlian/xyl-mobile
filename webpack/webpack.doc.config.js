const path = require('path');
const webpack = require('webpack');
const root = path.join(__dirname, '../', '');
const autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var less = require('postcss-less-engine');

const extractCSS = new ExtractTextPlugin({
    filename: 'css/css.css',
    allChunks: true
});
const extractLESS = new ExtractTextPlugin({
    filename: 'css/less.css',
    allChunks: true
});

module.exports = {
    entry: "./src/site/App.tsx",
    output: {
        path: path.join(root, 'build/site'),
        filename: "App.js"
    },
    devtool: 'source-map',
    resolve: {
        // alias: {
        //     'react': 'preact-compat',
        //     'react-dom': 'preact-compat'
        // },
        modules: [
            path.resolve(root, "src"),
            "node_modules"
        ],
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".less", ".css"]
    },
    watch: true,
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }, {
            test: /\.tsx?$/, //匹配的文件类型
            loader: "awesome-typescript-loader", //使用的编译模块
            exclude: [/node_modules/, /build/], //配置不需要编译的文件
        }, {
            test: /\.less$/i,
            use: extractLESS.extract({
                fallback: 'style-loader',
                use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    'less-loader'
                ]
            })
        }, {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            loader: extractCSS.extract({
                fallback: 'style-loader',
                use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    // { loader: 'resolve-url-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: 'inline'
                        }
                    },

                ]
            })
        }, {
            test: /\.svg$/,
            loader: 'svg-sprite-loader'
        }]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({ name: "commons", filename: "commons.js" }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    // less({ strictMath: true }),
                    // require('postcss-smart-import'),
                    require('precss'),
                    require("postcss-cssnext")()
                ]
            }
        }),
        extractCSS,
        extractLESS
    ]
};