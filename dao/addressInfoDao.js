const mongoose = require('mongoose')

let addressModel = mongoose.model('fy_addressinfos')
export class AddressInfoDao {
  //获取地址
  async getAddress(openId) {
    return new Promise((resolve, rej) => {
      addressModel.find({
        userId: openId,
        is_vaild: '0'
      }, (err, doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })
  }
  /**
   * 通过Id获取地址
   *
   * @param {*} id
   * @memberof AddressInfoDao
   */
  async getAddressById(id) {
    return new Promise((resolve, rej) => {
      addressModel.findOne({
        _id: id,
        is_vaild: '0'
      }, (err, doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })

  }

  /**
   * 更新收货地址
   *
   * @param {*} id
   * @param {*} openId
   * @memberof AddressInfoDao
   */
  async updateAddress(param, openId) {
    if (param.default == '1') {
      return new Promise((resolve,rej) => {
        addressModel.updateMany({
          userId: openId,
          is_vaild: '0'
        }, {
          $set: {
            default: '0'
          }
        }, (err, doc) => {
          if (!err) {
            addressModel.update({
              _id: param.id,
              is_vaild: '0'
            }, {
              $set: {
                name: param.name,
                tel: param.tel,
                address: param.address,
                default: '1'
              }
            }, (err, doc) => {
              if (!err) resolve(doc)
              else rej(err)
            })
          } else {
            rej(err)
          }
        })
      })
    } else {
      return new Promise((resolve,rej) => {
        addressModel.update({
          _id: param.id,
          is_vaild: '0'
        }, {
          $set: {
            name: param.name,
            tel: param.tel,
            address: param.address,
            default: '0'
          }
        }, (err, doc) => {
          if (!err) resolve(doc)
          else rej(err)
        })
      })
    }
  }


  /**
   * 删除地址
   *
   * @param {*} id
   * @returns
   * @memberof AddressInfoDao
   */
  async deleteAddress (id) {
    return new Promise((resolve,rej) => {
      addressModel.update({
        _id:id,
        is_vaild:'0'
      },{
        $set:{
          is_vaild: '1'
        }
      },(err,doc) => {
        if(!err) resolve(doc)
        else rej(err)
      })
    })
  }
}