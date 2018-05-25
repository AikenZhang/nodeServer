const Router = require('koa-router')
const { resolve } = require('path')
const _ = require('lodash')
const glob = require('glob')
const symbolPrefix = Symbol('prefix')
const routerMap = new Map()
const isArray = c => _.isArray(c) ?c :[c]
const R = require('ramda')
let logTimes = 0
export class BaseController {
    constructor (app,apiPath) {
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }

    init () {
       glob.sync(resolve(this.apiPath,'./**/*.js')).forEach(require)
        
        for (let [conf,callback] of routerMap){
            const callbacks= isArray(callback)
            const prefixpath = conf.target[symbolPrefix]
            if (prefixpath) prefixpath = norrmalizePath(prefixpath)
            const routerPath = prefixpath + conf.path
            this.router[conf.method](routerPath,...callbacks)
        }
        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())
    }
}

const norrmalizePath = path => new RegExp('^\/').test(path) ? path : `/${path}`

const toArray = R.unless(
    R.is(Array),
    R.of
  )
//链接 中间件
export const convert = middleware => (target, key, descriptor) => {
    target[key] = R.compose(
      R.concat(
        toArray(middleware)
      ),
      toArray
    )(target[key])
}

const router = conf => (target,key,descriptor) => {
    conf.path = norrmalizePath(conf.path)
    routerMap.set({
        target: target,
        ...conf
    },target[key])
}
//Controller 修饰符
export const Controller = path => target => {
    target.prototype[symbolPrefix] = path
}
//Get 修饰符
export const Get = path => router({
    method: 'get',
    path: path
})
//Post 修饰符
export const Post = path => router({
    method: 'post',
    path: path
})
// Log 修饰符
export const Log = convert(async (ctx, next) => {
    logTimes++
    console.time(`${logTimes}: ${ctx.method} - ${ctx.url}`)
    await next()
    console.timeEnd(`${logTimes}: ${ctx.method} - ${ctx.url}`)
})
