
const { Controller,Get,Post, Log} = require('../BaseController.js')
const { UserService } = require('../../service/user/UserService.js')
const { Result } = require('../../common/Result.js')
const userService = new UserService()
@Controller('/user')
export class UserController {
    //用户登陆
    @Post('/login')
    @Log
    async login (ctx,next) {
        const code = ctx.request.body.code 
        let data = await userService.login(code)
        console.log(data)
        ctx.body = new Result ({
            data:{
                token:'23423234'
            }
        }) 
    }
}