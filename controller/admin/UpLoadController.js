const { Controller,Post,Get} = require('../BaseController.js')
const { Result } = require('../../common/Result.js')
const { upload } = require('../../common/Upload.js')
const { QiNiu } = require('../../common/Qiniu.js')
const path = require('path')
const fs = require('fs')
const qiniu = new QiNiu()
@Controller('/admin')
export class UpLoad {
    @Post('/upload')
    async upLoad (ctx,next) {
       let res = await upload(ctx)
       ctx.body = new Result({
           data:'sdfs',
           code: '0'
       })
    }
}
    //    let f = path.join(__dirname,'../../upload/',Date.now().toString()+'.jpg')
    //    res.pipe(fs.createWriteStream(path.join(f)))