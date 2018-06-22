const { Controller,Post} = require('../BaseController.js')
const { ProductService } = require('../../service/ProductService.js')
const { Result } = require('../../common/Result.js')

let productService = new ProductService()
@Controller('/product/product')
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
    async getProdInfo (ctx,next) {
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

    /**
     * 添加购物车
     *
     * @param {*} ctx
     * @param {*} next
     * @memberof ProductController
     */
    @Post('/addshopCar')
    async add (ctx,next) {
        //try {
            let param = JSON.parse(ctx.request.body.param)
            let openId = ctx.request.token.openId
            let info = {
                ...param,
                openId
            }
            let data = await productService.addShopCar(info)
            if (data) (
                ctx.body = new Result({
                    code: '0',
                    data:true
                })
            )        
       //}catch(e){
        //     ctx.body = new Result({
        //         code: '-1',
        //         errMSg:'网络错误'
        //     })
        // }
    }
     //获取购物车列表
     @Post('/getshopCar')
     async getShopCarList (ctx,next) {
        try{
            let openId = ctx.request.token.openId
            let result = await productService.getshopCar(openId)
            ctx.body = new Result({
                code: '0',
                data:result
            })
        }catch(e){
            ctx.body = new Result({
                code: '-1',
                errMsg: "网络错误"
            })
        }
     }
}




// {
//     price:1000,
//     maxCount:12,
//     title:"夏日三家套",
//     id:'2342342423',
//     count:3 
//  }