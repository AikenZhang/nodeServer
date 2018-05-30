const Koa = require('koa')
const R = require('ramda')
const { resolve } = require('path')
const { connect,initSchemas } = require('./database/MoDBConnection.js')
const bodyParser = require('koa-bodyparser')
const { Interception } = require('./common/Interception.js')
const MIDDLEWARE = ['router']

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
    app.use(bodyParser())
    //挂载请求拦截
    app.use(Interception())
    // 挂载修饰符解析器
    await useMiddleWares(app)
    app.listen(3345)
    console.log('starting in listen 3345')
})()
