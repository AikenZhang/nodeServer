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
  
  /**
   * 产品排序
   * type 产品类别
   * key 排序类别
   * sort 排序方式
   * @memberof ProdTypeService
   */
  async prodSort (param) {
     return productDao.ProdSort(param)
  }
}