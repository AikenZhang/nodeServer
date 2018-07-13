const { resolve } = require('path')
const { BaseController } =require('../controller/BaseController.js')
export const Router = app => {
    const apiPath = resolve(__dirname,'../controller')
    const route = new BaseController(app,apiPath)
    route.init()
}