const { ProductDao } = require('../../dao/product/ProductDao.js')
const productDao = new ProductDao()
export class UpLoadService {
  async saveUpLoadInfo (info) {
   return  productDao.saveProdInfo(info)
  }
  async getProdInfo () {
    let type = await productDao.getType()
    let size = await productDao.getSize()
    return Promise.resolve({
      type,
      size
    })

  }
}