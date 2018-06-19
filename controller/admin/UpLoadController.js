const { Controller,Post,Get} = require('../BaseController.js')
const { Result } = require('../../common/Result.js')
const { uploader } = require('../../common/Upload.js')
const { ProductService } =require('../../service/ProductService.js')
const productService = new ProductService()
@Controller('/admin/upload')
export class UpLoad {
    @Post('/upload')
    async upLoad(ctx, next) {
        let formData = await uploader(ctx)
        let result = await productService.saveUpLoadInfo({
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
}