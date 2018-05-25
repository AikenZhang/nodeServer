const Koa = require('koa')
const R = require('ramda')
const { resolve } = require('path')
const { connect } = require('./database/MoDBConnection.js')
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
    await connect()
    const app = new Koa()
    await useMiddleWares(app)
    app.listen(3345)
    console.log('starting in listen 3345')
})()
