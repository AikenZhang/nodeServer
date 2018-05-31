const { Result } = require('./Result.js')
const { appConfig } = require('../appConfig.js')
const { deToken } = require('./MiniPro.js')
const { cryptod } = require('./util.js')
//token签名校验,保证信息的完整性
const comparToken = (token) => {
    let rawData = token.split('.').slice(0,2).join('.')
    console.log(rawData)
    let signa = token.split('.')[2]
    console.log(signa)
    return cryptod.crypto(rawData, appConfig.serviceSecret) == signa
}

export const Interception = () => async (cxt, next) => {
    if (cxt.request.url !== '/user/login') {
        //登录拦截 查看是否带有token
        const authToken = cxt.request.header['author-token']
        //检验token的正确性
        let t = comparToken(authToken)
        let token = deToken(authToken)
        //查看是否过期
        if ( !t || token.exp < new Date().getTime()) {
            console.log('登录过期')
            cxt.body = new Result({
                code: '111',
                errMSg: '登录过期'
            })
        } else {
            cxt.request.token = token
            await next()
        }
    }else {
        await next()
    }
   
}