const { TypeDao } =require('../dao/TypeDao.js')
const { ProductDao } = require('../dao/ProductDao.js')
const typeDao = new TypeDao()
const productDao = new ProductDao()
export class ProdTypeService {

  /**
   * 获取产品类型列表
   *
   * @memberof ProdTypeService
   */
  async getTypeList () {
     return typeDao.getTypeList()
  }

  async prodSort (type,key,sort) {
     return productDao.ProdSort()
  }
}