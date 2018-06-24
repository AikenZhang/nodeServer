
const { Controller,Get,Post, Log} = require('../BaseController.js')
const { UserService } = require('../../service/UserService.js')
const { Result } = require('../../common/Result.js')
const { createToken , getOpenId,deToken} = require('../../common/MiniPro.js') 
const userService = new UserService()
@Controller('/wx/user')
export class UserController {
    //用户登陆
    @Post('/login')
    @Log
    async login (ctx,next) {
        let code = ctx.request.body.code
        let userInfo = ctx.request.body.userInfo 
        let token = await userService.wxLogin(code,userInfo)
        ctx.body = new Result ({
            code: '0',
            data:{
                token:token
            }
        }) 
    }
    //获取用户信息
    @Post('/getuserinfo')
    async getUserInfo (cxt,next) {
        let token = cxt.request.token
        console.log(cxt.request)
        let data =await userService.getUserInfo(token.openId)
        if (data) {
            cxt.body = new Result({
                code: '0',
                data: data
            })
        }
        
    }
    //获取用户的收货地址
    @Post('/getaddress')
    async getAddress (ctx,next) {
        let openId = ctx.request.token.openId
        let data = await userService.getAddress(openId)
        ctx.body = new Result({
            code: '0',
            data
        })
    }

}