const { ProductDao } = require('../dao/ProductDao.js')
let productDao = new ProductDao()
const { ShopCarDao } = require('../dao/ShopCarDao.js')
const { CollectDao } = require('../dao/CollectDao.js')
const shopCarDao = new ShopCarDao()
const collectDao = new CollectDao()
export class ProductService {
    async saveUpLoadInfo(info) {
        //将tag 转化为数组保存
        info.tag = info.tag.split(',')
        return productDao.saveProdInfo(info)
    }
    /**
     * 获取商品列表
     *
     * @param {*} param
     * @returns
     * @memberof ProductService
     */
    async getProdList(param) {
        return productDao.getProdList(param)
    }
    /**
     *  获取商品的基本信息
     *
     * @returns
     * @memberof ProductService
     */
    async getProdInfo() {
        let color = await productDao.getColor()
        let size = await productDao.getSize()
        let type = await productDao.getType()
        return Promise.resolve({
            color,
            size,
            type
        })
    }
    /**
     * 用户添加购物车
     *
     * @param {*} info
     * @returns
     * @memberof ProductService
     */
    async addShopCar(info) {
        return shopCarDao.addShopCar(info)
    }
    /**
     * 获取购物车信息
     *
     * @param {*} openId
     * @memberof ProductService
     */
    async getshopCar(openId) {
        return shopCarDao.getShopCar(openId)
    }
    
    //更改购物车数量改变
    async updateShopCarCount (openId,prodId,count) {
        return shopCarDao.updateShopCarCount(openId,prodId,count)
    }
    //通过Id获取购物车信息
    async getShopCarById (prodId,openId) {
        return shopCarDao.getShopCarById(prodId,openId)
    }
    //删除购物车
    async deleteShopCar (prodId,openId) {
        return shopCarDao.deleteShopCar(prodId,openId)
    }
    //获取收藏状态
    async getCollectById (prodId,openId) {
        return collectDao.getCollectById(prodId,openId)
    }
    /**
     * 获取收藏
     *
     * @memberof ProductService
     */
    async getCollect (param,openId) {
        return collectDao.getCollect(param,openId)
    }
    //更新收藏状态
    async updateCollect (param,openId) {
        //取消收藏
        if (param.code == '0') {
          return collectDao.deleteCollect(param.id,openId)
        }else {
          return collectDao.addCollect(param.id,openId)
        }
    }

    /**
     * 删除收藏
     *
     * @param {*} prodId
     * @param {*} openId
     * @memberof ProductService
     */
    async deleteCollect(prodId,openId) {
        return collectDao.deleteCollect(prodId,openId)
    }
}