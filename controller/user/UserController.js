
const { Controller,Get,Post, Log} = require('../BaseController.js')
const { UserService } = require('../../service/user/UserService.js')

@Controller('/user')
export class UserController {
    @Get('/get')
    @Log
    async getName (cxt,next) {
        let data=await new UserService().addUser()
        if(data) {
            console.log(data)
            cxt.body='你成功了'
        }
       
    }
}