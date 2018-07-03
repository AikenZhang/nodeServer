const { Result } = require('./Result.js')
const { appConfig } = require('../appConfig.js')
const { deToken } = require('./MiniPro.js')
const { cryptod } = require('./util.js')
//不需要token验证白名单
const passArr = [
    '/wx/user/login',
    '/admin/user/login',
    '/admin/user/registry',
    '/view/*'
]
//token签名校验,保证信息的完整性
const comparToken = (token) => {
    try{
        let rawData = token.split('.').slice(0,2).join('.')
       // console.log(rawData)
        let signa = token.split('.')[2]
        //console.log(signa)
        return cryptod.crypto(rawData, appConfig.serviceSecret) == signa
    }catch(e) {
       // console.log(e)
    }
   
}

export const Interception = () => async (cxt, next) => {
    console.log(cxt.request.url)
    if (passArr.indexOf(cxt.request.url) > -1 ) {
        await next()
    }
    else {
         //登录拦截 查看是否带有token
         const authToken = cxt.request.header['author-token']
         let t,token
         if (authToken && authToken !== 'null') {
              //检验token的正确性
             t = comparToken(authToken)
             token = deToken(authToken)
         }
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
    }
   
}