import { resolve } from 'dns';

const mongoose = require('mongoose')
let TypeModel = mongoose.model('fy_types')
export class TypeDao {
  /**
   * 获取分类列表
   *
   * @memberof TypeDao
   */
  async getTypeList () {
    return new Promise((resolve,rej) => {
      TypeModel.find({},(err,doc) => {
        if(!err) resolve(doc)
        else rej(err)
      })
    }) 
  }
}