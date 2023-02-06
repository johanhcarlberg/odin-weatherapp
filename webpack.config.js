const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
    },
    devtool: 'inline-source-map',
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                template: './src/index.html',
                title: 'Weather App',
            }
        )
    ],  
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
}