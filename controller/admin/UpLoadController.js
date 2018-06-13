const { Controller,Post,Get} = require('../BaseController.js')
const { Result } = require('../../common/Result.js')
const { upload } = require('../../common/Upload.js')
const { QiNiu } = require('../../common/Qiniu.js')
const { uploader } = require('../../common/Upload.js')
const { UpLoadService } =require('../../service/admin/UpLoadService.js')
const upLoadService = new UpLoadService()
@Controller('/admin')
export class UpLoad {
    @Post('/upload')
    async upLoad(ctx, next) {
        let formData = await uploader(ctx)
        console.log(formData)
        let result = upLoadService.saveUpLoadInfo({
            ...formData
        })
        if (formData) {
            ctx.body = new Result({
                data: 'sdfs',
                code: '0'
            })
        }else {
            ctx.body = new Result({
                errMSg: '上传失败',
                code: '-1'
            })
        }
    }
}