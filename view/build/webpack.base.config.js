const path = require('path')
const vueLoaderOption = require('./vue-loader.config.js')
const isDev = process.env.NODE_ENV === 'development'
console.log(isDev)
module.exports = {
    target: 'web',
    entry: path.resolve(__dirname,'../src/main.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname,'../dist')
    },
    module: {
        rules: [
            {
                test:/\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude:/node_modules/,
                enforce: 'pre'
            },{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderOption(isDev)
            },{
                test: /\.js/,
                loader: 'babel-loader',
            },{
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}