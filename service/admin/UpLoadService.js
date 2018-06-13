const { ProductDao } = require('../../dao/product/ProductDao.js')
const productDao = new ProductDao()
export class UpLoadService {
  async saveUpLoadInfo (info) {
   return  productDao.saveProdInfo(info)
  }
}