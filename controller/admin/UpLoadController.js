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
        let result = await upLoadService.saveUpLoadInfo({
            ...formData.fields,
            files:formData.files,
            userId:'zhang'
        })
        if (result) {
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
    @Post('/getprodinfo')
    async getProdInfo () {
        try{
            let data = await upLoadService.getProdInfo()
            ctx.body =new Result({
                code: '0',
                data: data
            })
        }catch(e){
            ctx.body =new Result({
                code: '-1',
                data: data,
                errMSg: '网络错误'
            })
        }
       
    }
}