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
       //获取 产品信息
       let prodInfo = await prodDao.getProdById(param.prodArr)
       //从购物车获取信息
       let shopCar = await shopCarDao.getShopCarById(param.prodArr,openId)
       //判断商品的库存是否充足
       _.forEach(shopCar,(v,k) => {
         let prod = _.filter(prodInfo,{ 'id':v.id})
         if (parseInt(v.count) > parseInt(prod.count)){
            errArr.push(prod.title)
         }else {
           orderArr.push({
             id:orderId,
             openId:openId,
             userId:prod.userId,
             price:v.price,
             count:v.count,
             size:v.size,
             color:v.color,
             address:param.userInfo.address,
             tel:param.userInfo.tel
           })
         }
         if (errArr.length > 0) {
           return Promise.resolve({
             code: '-2',
             errMsg:errArr.join(',') + '库存不足'
           })
         }else {
          return orderDao.addOrder(orderArr)
         }
       })
      
    }
}