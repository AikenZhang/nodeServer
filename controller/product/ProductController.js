const { Controller,Get,Post, Log} = require('../BaseController.js')
const { ProductService } = require('../../service/product/ProductService.js')
const { Result } = require('../../common/Result.js')

let productService = new ProductService()
@Controller('/product')
export class ProductController {
    @Post('/getprolist')
    async getProductList (cxt,next) {
       let type = cxt.request.body.type || '0'
       let openId = cxt.request.token.openId
       let proList = await productService.getProdList(openId,type)
       cxt.body = new Result({
           data:proList
       })
    }
}