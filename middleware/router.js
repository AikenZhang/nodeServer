const { resolve } = require('path')
const { BaseController } =require('../controller/BaseController.js')
export const route = app => {
    const apiPath = resolve(__dirname,'../controller')
    const route = new BaseController(app,apiPath)
    route.init()
}