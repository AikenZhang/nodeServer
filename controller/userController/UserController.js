
const { Controller,Get,Post, Log} = require('../BaseController.js')

@Controller('/user')
export class UserController {
    @Get('/get')
    @Log()
    async getName (cxt,next) {
        cxt.body='你成功了'
    }
}