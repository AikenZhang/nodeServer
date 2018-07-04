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
    @Post('/addorder')
    async addOrder (ctx,next) {
     try {
        let openId = ctx.request.token.openId
        let param =JSON.parse(ctx.request.body.param)
        let result = await orderService.addOrder(param,openId)
 
        if (result && result.code == '-2') {
            ctx.body = new Result({
                code: '-2',
                errMsg:result.errMsg
            })
        }else{
            ctx.body = new Result({
                code:'0',
                data:result.data
            })
        }
    }catch(e) {
        ctx.body = new Result({
            code: '-1',
            errMsg: '网络错误'
        })
    }
    }
     /**
     * 用户获取订单
     *
     * @param {*} ctx
     * @param {*} next
     * @memberof UserController
     */
    @Post('/getorder')
    async getPay (ctx,next) {
        //try{
            let openId = ctx.request.token.openId
            let param = JSON.parse(ctx.request.body.param)
            let result = await orderService.getOrder(openId,param)
            ctx.body = new Result({
                code: '0',
                data:result
           })
        // }catch(e){
        //     ctx.body = new Result({
        //         code: '-1',
        //         errMsg: '网络错误'
        //     })
        // }
    }

    /**
     * 删除订单
     *
     * @param {*} ctx
     * @param {*} next
     * @memberof ProductController
     */
    @Post('/deleteorder')
    async deleteOrder(ctx,next) {
        let id = JSON.parse(ctx.request.body.param).id
        let data = orderService.deleteOrder(id)
        ctx.body = new Result({
            code: '0',
            data: data
        })
    }
    //确认收货
    @Post('/receiptOrder')
    async receiptOrder (ctx,next) {
        try{
            let param = JSON.parse(ctx.request.body.param)
            await orderService.receiptOrder(param.id)
            ctx.body = new Result({
                code: '0'
            })
        }catch(e){
            ctx.body = new Result({
                code: '-1',
                errMsg: '网络错误'
            })
        }
    }
  
}