const { Controller,Post} = require('../BaseController.js')
const { OrderService } = require('../../service/OrderService.js')
const { Result } = require('../../common/Result.js')
let orderService = new OrderService()
@Controller('/product/order')
export class ProductController {
    /**
     * 用户添加订单
     *
     * @param {*} ctx 
     * @param {*} next
     * @memberof ProductController
     */
    @Post('/add')
    async addOrder (ctx,next) {
    //try {
        let openId = ctx.request.token.openId
        let param =JSON.parse(ctx.request.body.param)
        let result = await orderService.addOrder(param,openId)
 
        if (result || result.code == '-2') {
            ctx.body = new Result({
                code: '-2',
                errMsg:result.errMSg
            })
        }else{
            ctx.body = new Result({
                code:'0',
                data:true
            })
        }
    // }catch(e) {
    //     ctx.body = new Result({
    //         code: '-1',
    //         errMsg: '网络错误'
    //     })
    // }
    }
  
}




// {
//     price:1000,
//     maxCount:12,
//     title:"夏日三家套",
//     id:'2342342423',
//     count:3 
//  }