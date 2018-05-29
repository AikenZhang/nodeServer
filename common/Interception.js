const { Result } = require('./Result.js')
const { appConfig } = require('../appConfig.js')
const { deToken } = require('./MiniPro.js')

export const Interception = () => async (cxt,next) => {
    //登录拦截 查看是否带有token
    //const token = cxt.request.header['author-token']
    // const token ='eyJ0eXBlIjoiSldUIiwiYWxnIjoiQUVTIn0=.eyJleHAiOjE1Mjc1ODM2NjYyNTAsImxhdCI6MTUyNzU4MDc4NjI1MCwib3BlbklkIjoiemhhbmdndWFuZ2h1YSJ9.7cf303e81c8ab1644b89d6ccb151f02c9521dd27e4df9bc53045fcb3b548b163bc1a6d5f2e43d17f3eebc114a756c8a936e68902431c27a28bfe645e76317cd3bd36068222ef2f00a30fa556dbaf07d996d34d0b50e030812a3c8d2c21ed06b16d6b3a5aecc236b8ddb2780c81d529754fc14bf5b8dad6288f0fcd5c3badc1c5'
    // console.log(deToken(token))
    // console.log('1')
    // cxt.body ={
    //     token:111
    // }
    await next()
}