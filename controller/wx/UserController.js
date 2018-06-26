import { OrderService } from '../../service/OrderService.js';

const { Controller,Get,Post, Log} = require('../BaseController.js')
const { UserService } = require('../../service/UserService.js')
const { Result } = require('../../common/Result.js')
const { createToken , getOpenId,deToken} = require('../../common/MiniPro.js') 
const userService = new UserService()
const orderService = new OrderService()
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
    /**
     *获取用户信息
     *
     * @param {*} cxt
     * @param {*} next
     * @memberof UserController
     */
    @Post('/getuserinfo')
    async getUserInfo (cxt,next) {
        try{
            let token = cxt.request.token
        console.log(cxt.request)
        let data =await userService.getUserInfo(token.openId)
        if (data) {
            cxt.body = new Result({
                code: '0',
                data: data
            })
        }
        }catch(e){
            ctx.body = new Result({
                code: '-1',
                errMsg: '网络错误'
            })
        }
        
        
    }
    /**
     * 获取用户的收货地址
     *
     * @param {*} ctx
     * @param {*} next
     * @memberof UserController
     */
    @Post('/getaddress')
    async getAddress (ctx,next) {
        let openId = ctx.request.token.openId
        let data = await userService.getAddress(openId)
        ctx.body = new Result({
            code: '0',
            data
        })
    }
   
    /**
     * 获取商户的信息
     *
     * @memberof UserController
     */
    @Post('/getinfobyuserid')
    async getInfoByUserId (ctx,next) {
        try {
            let param = JSON.parse(ctx.request.body.param)
            let data = await userService.getUserInfo(param.userId)
            ctx.body = new Result({
                code: '0',
                data
            })
        }catch(e){
            ctx.body = new Result({
                code: '-1',
                errMsg: '网络错误'
            })
        }
    }
 
   
}