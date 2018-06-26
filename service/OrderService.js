const _ = require('lodash')
const { fyId } = require('../common/util.js')
const { OrderDao } = require('../dao/OrderDao.js')
const { ShopCarDao } = require('../dao/ShopCarDao.js')
const { ProductDao } = require('../dao/ProductDao.js')
let orderDao = new OrderDao()
let prodDao = new ProductDao()
let shopCarDao = new ShopCarDao()
export class OrderService {
    /**
     * 添加订单
     *
     * @param {Object} param
     * @memberof OrderService
     */
    async addOrder (param,openId) {
       let orderId = fyId() //生成订单id 
       let errArr = [] //错误信息
       let orderArr = []//订单信息
       let countArr = [] //产品数量更改 
       //获取 产品信息
       let prodInfo = await prodDao.getProdById(param.prodArr)
       //从购物车获取信息
       let shopCar = await shopCarDao.getShopCarById(param.prodArr,openId)
       //判断商品的库存是否充足
       _.forEach(shopCar,(v,k) => {
         let prod = _.filter(prodInfo,{ 'id':v.id})
         if (parseInt(v.count) > parseInt(prod[0].count)){
            errArr.push(prod[0].title)
         }else {
           orderArr.push({
             id:orderId,
             prodId:v.id,
             openId:openId,
             userId:prod[0].userId,
             price:v.price,
             count:v.count,
             size:v.size,
             color:v.color,
             address:param.userInfo.address,
             tel:param.userInfo.tel,
             name:param.userInfo.name,
             src:prod[0].files[0].src,
             title:prod[0].title
           })
           countArr.push({
             id:v.id,
             count: parseInt(prod[0].count) - parseInt(v.count)
           })
         }
       })
      if (errArr.length > 0) {
        return Promise.resolve({
          code: '-2',
          errMsg:errArr.join(',') + '库存不足'
        })
      }else {
        //添加订单
        await orderDao.addOrder(orderArr)
        //更改shopCar状态
        await shopCarDao.toOrder(param.prodArr,openId)
        //更改prod 的数量
        await prodDao.updateCount(countArr)
        return Promise.resolve({
          code: '0',
          data: orderId
        })
      }
    }
    /**
     * 用户获取订单
     *
     * @param {*} openId 用户Id
     * @param {*} type  1: 未支付 2：未收货 3：全部
     * @memberof OrderService
     */
    async getOrder (openId,type) {
        switch (type) {
          case '1': return orderDao.getPayNo(openId);break;
          case '2': return orderDao.getShipNo(openId);break;
          case '3': return orderDao.getOrder(openId);break;
          default: return Promise.reject('没有此类型')
        }
    }

    //确认收货
    async receiptOrder (_id) {
      return orderDao.receiptOrder(_id)
    }
}