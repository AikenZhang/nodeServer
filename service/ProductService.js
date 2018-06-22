const {
    ProductDao
} = require('../dao/ProductDao.js')
let productDao = new ProductDao()
const {
    ShopCarDao
} = require('../dao/ShopCarDao.js')
const shopCarDao = new ShopCarDao()
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

}