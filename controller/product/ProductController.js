const { Controller,Get,Post, Log} = require('../BaseController.js')
const { ProductService } = require('../../service/product/ProductService.js')
const { Result } = require('../../common/Result.js')

let productService = new ProductService()
@Controller('/product')
export class ProductController {
    @Post('/getprolist')
    async getProductList (ctx,next) {
       let type = ctx.request.body.type || '0'
       let openId = ctx.request.token.openId
       let proList = await productService.getProdList(openId,type)
       ctx.response.body = new Result({
           data:'sdfs',
           code: '111'
       })
       ctx.response.status = 200
    }

    @Post('/uploadfile')
    async upLoadFile (ctx,next) {
        let params = ctx.request.body

    }
}