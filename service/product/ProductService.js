const { ProductDao } = require('../../dao/ProductDao.js')
let productDao = new ProductDao()
export class ProductService {
    //获取商品列表
    async getProdList(param) {
        return productDao.getProdList(param)
    }

    //获取商品的基本信息
    async getProdInfo () {
        let color = await productDao.getColor()
        let size = await productDao.getSize()
        let type = await productDao.getType()
        return Promise.resolve({
            color,
            size,
            type
        })
    }
}