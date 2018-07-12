const corsd = require('koa-cors')
const { appConfig } = require('../appConfig.js')
export const Cors = app =>{
    let baseConfig = {
        origin:'',
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }
    let devConfig = {
        origin: function (ctx) {
            return '*'
        }
    }
    let prodConfig = {
        origin: function (ctx) {
            return 'fashionserver.zhangguangh.cn'
        }
    }
    let config = process.env.NODE_ENV == 'production' ? Object.assign(baseConfig, prodConfig) : Object.assign(baseConfig,devConfig)
    app.use(corsd(config))
    console.log(process.env.NODE_ENV == 'production')
}