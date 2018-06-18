const { Controller,Post} = require('../BaseController.js')
const { ProductService } = require('../../service/product/ProductService.js')
const { Result } = require('../../common/Result.js')

let productService = new ProductService()
@Controller('/product')
export class ProductController {
    @Post('/getprolist')
    async getProductList (ctx,next) {
       let param = ctx.request.body.param
       console.log(ctx.response.body)
       try{
         let proList = await productService.getProdList(param)
         ctx.response.body = new Result({
            code:'0',
            data: proList
        })
       }catch(e){
        ctx.response.body = new Result({
            code:'-1',
            errMsg: "网络错误"
        })
       }
    }
    //获取商品的基本信息
    @Post('/getprodinfo')
    async upLoadFile (ctx,next) {
       try{
        let info = await productService.getProdInfo()
        ctx.body = new Result({
            code: '0',
            data:info
        })
       }catch (e) {
        ctx.response.body = new Result({
            code:'-1',
            errMsg: "网络错误"
        })
       }
     }
}