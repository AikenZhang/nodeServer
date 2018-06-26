const { Controller,Post} = require('../BaseController.js')
const { Result } = require('../../common/Result.js')
const { ProdTypeService } = require('../../service/ProdTypeService.js')
const prodTypeService = new ProdTypeService()
const { ProductService } = require('../../service/ProductService.js')
const productService = new ProductService()
@Controller('product/type')
export class ProdTypeController {
  
  /**
   * 获取分类列表
   *
   * @param {*} ctx
   * @param {*} next
   * @memberof ProdTypeController
   */
  @Post('/gettypelist')
  async getTypeList (ctx,next) {
    try {
      let data = await prodTypeService.getTypeList()
      ctx.body = new Result({
        code: '0',
        data:data
      })
    } catch (e) {
      ctx.body = new Result({
        code: '-1',
        errMsg: "网络错误"
      })
    }
    /**
   * 产品排序
   *
   * @param {*} ctx
   * @param {*} next
   * @memberof ProdTypeController
   */
    @Post('/getprodsort')
    async getProdSort (ctx,next) {
      try {
        let param = JSON.parse(ctx.request.body.param)
        let data = productService.getProdList(param)
        let
      } catch (error) {
        ctx.body = new Result({
          code: '-1',
          errMsg: '网络错误'
        })
      }
     
    }

  }
}