const { Controller,Post,Get} = require('../BaseController.js')
const { Result } = require('../../common/Result.js')
const { upload } = require('../../common/Upload.js')
const { QiNiu } = require('../../common/Qiniu.js')
const { uploader } = require('../../common/Upload.js')
@Controller('/admin')
export class UpLoad {
    @Post('/upload')
    async upLoad(ctx, next) {
        let formData = await uploader(ctx)
        ctx.body = new Result({
            data: 'sdfs',
            code: '0',
            data:formData
        })
    }
}
    //    let f = path.join(__dirname,'../../upload/',Date.now().toString()+'.jpg')
    //    res.pipe(fs.createWriteStream(path.join(f)))