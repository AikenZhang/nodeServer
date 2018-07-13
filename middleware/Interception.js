const { Result } = require('../common/Result.js')
const { appConfig } = require('../appConfig.js')
const { cryptod, deToken } = require('../common/util.js')
//不需要token验证白名单
const passArr = [
    '/wx/user/login',
    '/admin/user/login',
    '/admin/user/registry',
    '/product/product/getprolist'
]
//静态文件路径
const staticArr = [
    ' ',
    'static'
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
       console.log(e)
    }
   
}

let interception = async (ctx,next) => {
    let url = ctx.request.url
    //await next()
    if (passArr.indexOf(url) > -1 ) {
        await next()
    }
    else if(url=='/' || url.split('/')[1]=='static'){
        await next()
    }
    else {
         //登录拦截 查看是否带有token
         const authToken = ctx.request.header['author-token']
         let t,token
         if (authToken && authToken !== 'null') {
              //检验token的正确性
             t = comparToken(authToken)
             token = deToken(authToken)
         }
         //查看是否过期
         if ( !t || token.exp < new Date().getTime()) {
             console.log('登录过期')
             ctx.body = new Result({
                 code: '111',
                 errMsg: '登录过期'
             })
         } else {
             ctx.request.token = token
             await next()
         }
    }
}

export const Interception = (app) => {
    app.use(interception)
}