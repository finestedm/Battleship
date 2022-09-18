const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'inline-source-map',


    // resolve: {
    //     alias: {
    //         config$: './configs/app-config.js',
    //     },
    //     extensions: ['', 'js'],
    //     modules: [
    //         'node_modules',
    //         'bower_components',
    //         'shared',
    //         '/shared/vendor/modules',
    //     ],
    // },

    plugins: [

        new HtmlWebpackPlugin({

            title: 'Battleship',
            template: './src/template.html'

        }),

    ],

    devServer: {

        static: './dist',

    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/Battleship/",
        clean: true,
    },

    module: {

        rules: [

            {

                test: /\.css$/i,

                use: ['style-loader', 'css-loader'],

            },
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset/resource',

            }
        ],

    },
    optimization: {

        runtimeChunk: 'single',

    },
};