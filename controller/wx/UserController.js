
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
    //添加购物车
    @Post('/addshopCar')
    async add (ctx,next) {
        try {
            let param = JSON.parse(ctx.request.body.param)
            let userId = ctx.request.token.openId
            let info = {
                ...param,
                userId
            }
            let data = await userService.addShopCar(info)
            if (data) (
                ctx.body = new Result({
                    code: '0',
                    data:true
                })
            )        
       }catch(e){
            ctx.body = new Result({
                code: '-1',
                errMSg:'网络错误'
            })
        }
    }
}