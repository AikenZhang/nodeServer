const { Controller,Post,Get} = require('../BaseController.js')
const { Result } = require('../../common/Result.js')
const { UserService } = require('../../service/UserService.js')
const userService = new UserService()
@Controller('/admin/user')
export class UserController {
  @Post('/login')
  async login (ctx,next) {
   try{
    let param = JSON.parse(ctx.request.body.param)
    let result = await userService.adminLogin(param)
    if (result) {
      ctx.body = new Result({
        code: '0',
        data: result
      })
    }else{
      ctx.body = new Result({
        code: '-1',
        data: '账号/密码错误'
      })
    }
  }catch(e){
   ctx.body = new Result({
     code: '-1',
      errMsg: '网络错误'
   })
   }
  }
  
  //平台用户注册账号
  @Post('/registry')
  async registry (ctx,next) {
    let param = JSON.parse(ctx.request.body.param)
    
  }
}