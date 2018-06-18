const { ProductDao } = require('../../dao/ProductDao.js')
const productDao = new ProductDao()
export class UpLoadService {
  async saveUpLoadInfo (info) {
   info.tag = info.tag.split(',')
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