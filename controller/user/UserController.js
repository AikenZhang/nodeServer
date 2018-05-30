
const { Controller,Get,Post, Log} = require('../BaseController.js')
const { UserService } = require('../../service/user/UserService.js')
const { Result } = require('../../common/Result.js')
const { createToken , getOpenId,deToken} = require('../../common/MiniPro.js') 
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
        let data = await userService.save(openId,userInfo)
        if (data){
            console.log('登录成功')
        }
        let token =await createToken(openId.openid)
        ctx.body = new Result ({
            code: '0',
            data:{
                token:token
            }
        }) 
    }
    @Post('/getuserinfo')
    @Log
    async getUserInfo (cxt,next) {
        const authToken = cxt.request.header['author-token']
        let token = deToken(authToken)
        console.log(token)
        let data =await userService.getUserInfo(token.openId)
        if (data) {
            console.log(data)
            cxt.body = new Result({
                code: '0',
                data: data
            })
        }
        
    }
}