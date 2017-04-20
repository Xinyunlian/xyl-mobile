const path = require('path');
const webpack = require('webpack');
const _ = require('underscore');
// const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
// const replaceAppPath = require('./replaceAppPath');

const root = path.join(__dirname, '../', '');

module.exports = function (env) {

    const version = env ? env.version ? env.version : '' : '';

    return {
        devtool: 'source-map',
        entry: {
            'Login': "./src/Login.tsx",
            'Mobile': "./src/Mobile.tsx",
            'Pc': "./src/Pc.tsx",
            'Index': "./src/Index.tsx",
        },
        output: {
            path: 'build',
            filename: '[name].[chunkhash].js',
            libraryTarget: 'amd'
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
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': JSON.stringify('production')
            // }),
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     },
            //     except: ['$super', '$', 'exports', 'require']
            // }),
            new webpack.optimize.CommonsChunkPlugin('Common'),
            replaceAppPath,
        ]
    };
};

function replaceAppPath(stats) {

    const fse = require('fs-extra');

    this.plugin("done", function (stats) {

        const indexPathBuild = path.join(root, "./build/templates/login", "login.ftl");
        const assetsByChunkName = stats.toJson().assetsByChunkName;

        fse.copy(path.join(root, ".", "/templates/"), path.join(root, ".", "/build/templates/"), function () {

            require('replace-in-file')({
                files: indexPathBuild,
                from: [/__path__/g],
                to: [JSON.stringify(_.mapObject(assetsByChunkName, function (value, key) {
                    return _.isArray(value) ? value[0].replace('.js', '') : value.replace('.js', '')
                }))],
                allowEmptyPaths: false,
                encoding: 'utf8',
            });
        });

    });
}

