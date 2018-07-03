const corsd = require('koa-cors')
const { appConfig } = require('../appConfig.js')
export const cors = () => {
    return corsd({
        origin: function (ctx) {
            return '*'
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
}