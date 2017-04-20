const path = require('path');

const root = path.join(__dirname, '../', '');

module.exports = {
    entry: "./src/App.tsx",
    output: {
        path: path.join(root, 'build'),
        filename: "App.js"
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            'react': 'inferno-compat',
            'react-dom': 'inferno-compat'
        },
        modules: [
            path.resolve(root, "src"),
            "node_modules"
        ],
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'less-loader'
                ]
            }, {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: [/node_modules/, /build/]
            }, {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            }
        ]
    }
};
