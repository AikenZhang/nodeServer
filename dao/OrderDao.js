const mongoose = require('mongoose')

let orderModel = mongoose.model('fy_orders')
export class OrderDao {
  /**
   * 插入订单
   *
   * @param {Object} param
   * @memberof OrderDao
   */
  async addOrder (param) {
    return new Promise((resolve, rej) => {
      orderModel.insertMany(param, (err, doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })
  }
  /**
   * 用户获取未支付订单
   *
   * @param {*} openId
   * @memberof OrderDao
   */
  async getPayNo (openId) {
    return new Promise((resolve,rej) =>{
      orderModel.find({
        openId,
        is_vaild: '0',
        is_pay: '0',
        is_ship: '0',
        is_end: '0'
      },(err,doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })
  }
   
  /**
   * 用户获取未收货订单
   *
   * @returns
   * @memberof OrderDao
   */
  async getShipNo (openId) {
    return new Promise((resolve,rej) =>{
      orderModel.find({
        openId,
        is_vaild: '0',
        is_pay: '1',
        is_ship: '1',
        is_end: '0'
      },(err,doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })
  }
  
  /**
   * 用户获取全部订单
   *
   * @param {*} openId
   * @returns
   * @memberof OrderDao
   */
  async getOrder (openId) {
    return new Promise((resolve,rej) =>{
      orderModel.find({
        openId,
        is_vaild: '0'
      },(err,doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })
  }
  //确认收货
  async receiptOrder (_id) {
    return new Promise((resolve,rej) => {
      orderModel.update({
        _id,
        is_vaild: '0',
        is_pay: '1',
        is_ship: '1'
      },{
        $set:{
          is_end:'1'
        }
      },(err,doc) => {
        if(!err) resolve(doc)
        else rej(err)
      })
    })
    
  }
}