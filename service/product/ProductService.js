const { ProductDao } = require('../../dao/product/ProductDao.js')
let productDao = new ProductDao()
export class ProductService {
    //获取商品列表
    async getProdList(openId,type) {
        return productDao.getProdList(openId,type)
    }
}