
const { Controller,Get,Post, Log} = require('../BaseController.js')
const { UserService } = require('../../service/user/UserService.js')
const { Result } = require('../../common/Result.js')
const { createToken , getOpenId} = require('../../common/MiniPro.js') 
const userService = new UserService()
@Controller('/user')
export class UserController {
    //用户登陆
    @Post('/login')
    @Log
    async login (ctx,next) {
        let code = ctx.request.body.code 
        let userInfo = ctx.request.body.userInfo
        console.log(userInfo)
        //获取openId
        let openId = await getOpenId(code)
        //保存详细信息
        let data = await userService.save(code)
        console.log(user)
        let token =await createToken(code)
        ctx.body = new Result ({
            code: '0',
            data:{
                token:'token'
            }
        }) 
    }
    @Post('/getuserinfo')
    @Log
    async getUserInfo (ctx,next) {
        const body = ctx.request.body 
        console.log(body)
    }
}