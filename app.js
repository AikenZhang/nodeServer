require('babel-core/register')()
require('babel-polyfill')
const Koa = require('koa')
const R = require('ramda')
const view = require('koa-static')
const { resolve } = require('path')
const { connect,initSchemas } = require('./database/MoDBConnection.js')
const bodyParser = require('koa-bodyparser')
//需要挂载的中间件
const MIDDLEWARE = ['Cors','Interception','Router']
const useMiddleWares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname,`./middleware/${name}`)
        )
    )(MIDDLEWARE)
}
//启动监听
(async () =>{
    //链接数据库
    await connect()
    //初始化schema
    initSchemas()
    const app = new Koa()
    //添加body 解析
    app.use(bodyParser())
    //挂载中间件
    await useMiddleWares(app)
    app.use(view(resolve( __dirname,  './view/dist')))
    app.listen(3345)
    console.log('starting in listen 3345')
})()
