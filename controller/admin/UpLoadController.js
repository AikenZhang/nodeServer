const { Controller,Post,Get} = require('../BaseController.js')
const { Result } = require('../../common/Result.js')
@Controller('/admin')
export class UpLoad {
    @Post('/upload')
    async upLoad (ctx,next) {
       let body = ctx.request.body.files

       console.log(body)
       ctx.response.body = new Result({
           data:'sdfs',
           code: '0'
       })
    }
}