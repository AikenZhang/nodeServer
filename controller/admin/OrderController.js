const { Controller,Post,Get} = require('../BaseController.js')
const { Result } = require('../../common/Result.js')
const { OrderService } = require('../../service/OrderService.js')
const orderService = new OrderService()
@Controller('/admin/order')
export class OrderController {
  /**
   * 获取订单
   *
   * @param {*} ctx
   * @param {*} next
   * @memberof OrderController
   */
  @Post('/getorder')
  async getOrder (ctx,next) {
    let param = JSON.parse(ctx.request.body.param)
    let userId = ctx.request.token.openId
    let data = await orderService.adminGetOrder(userId,param)
    ctx.body = new Result({
      code: '0',
      data
    })

  }
}