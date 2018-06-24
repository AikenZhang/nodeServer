const mongoose = require('mongoose')

let addressModel = mongoose.model('fy_addressinfos')
export class AddressInfoDao {
  //获取地址
  async getAddress(openId) {
    return new Promise((resolve, rej) => {
        addressModel.find({
            userId:openId,
            is_vaild: '0'
        }, (err, doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })
  }
}