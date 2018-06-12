const corsd = require('koa-cors')
const { appConfig } = require('../appConfig.js')
export const cors = () => {
    return corsd({
        origin: function (ctx) {
            if (ctx.url === '/test') {
                return "*"; // 允许来自所有域名请求
            }
            return '*'
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
}