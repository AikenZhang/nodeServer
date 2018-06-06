const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const marge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
process.env.NODE_ENV = 'development'
const baseConfig = require('./webpack.base.config.js')

module.exports = marge(baseConfig,{
    devtool: "#cheap-module-eval-source-map",
    module: {
        rules: [
            {
                test: /\.styl/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    devServer: {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        headers: { 'Access-Control-Allow-Origin': '*' },
        hot: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new HTMLPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
})
