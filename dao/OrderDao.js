const {
  BaseDao
} = require('./BaseDao')

const mongoose = require('mongoose')

let orderModel = mongoose.model('fy_orders')
export class OrderDao extends BaseDao {
  /**
   * 插入订单
   *
   * @param {Object} param
   * @memberof OrderDao
   */
  async addOrder(param) {
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
  async getPayNo(openId, param) {
      let aggregate = [{
        $match:{
          openId,
          is_vaild: '0',
          is_pay: '0',
          is_ship: '0',
          is_end: '0'
        }
      },{
        $sort:{
          "meta.createdAt": -1
        }
      }]
     return this.pageQuery(orderModel, aggregate, param.page, param.pageSize)
  }

  /**
   * 用户获取未收货订单
   *
   * @returns
   * @memberof OrderDao
   */
  async getShipNo(openId, param) {
      let aggregate = [{
        $match: {
          openId,
          is_vaild: '0',
          is_pay: '1',
          is_ship: '1',
          is_end: '0'
        }
      },{
        $sort:{
          "meta.createdAt": -1
        }
      }]
     return this.pageQuery(orderModel, aggregate, param.page, param.pageSize)
  }

  /**
   * 用户获取全部订单
   *
   * @param {*} openId
   * @returns
   * @memberof OrderDao
   */
  async getOrder(openId, param) {

    let aggregate = [{
      $match: {
        openId,
        is_vaild: '0'
      }
    }, {
      $sort: {
        "meta.createdAt": -1
      }
    }]
    return this.pageQuery(orderModel, aggregate, param.page, param.pageSize)
  }

  /**
   * 确认收货
   *
   * @param {*} _id
   * @returns
   * @memberof OrderDao
   */
  async receiptOrder(_id) {
    return new Promise((resolve, rej) => {
      orderModel.update({
        _id,
        is_vaild: '0',
        is_pay: '1',
        is_ship: '1'
      }, {
        $set: {
          is_end: '1'
        }
      }, (err, doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })

  }

  /**
   * 删除订单
   *
   * @param {*} id
   * @returns
   * @memberof OrderDao
   */
  async deleteOrder(id) {
    return new Promise((resolve, rej) => {
      orderModel.update({
        _id: id,
        is_vaild: '0'
      }, {
        $set: {
          is_vaild: '1'
        }
      }, (err, doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })
  }
  
  /**
   * 获取未发货订单
   *
   * @param {*} userId
   * @param {*} param
   * @memberof OrderDao
   */
  async getNoShip(userId,param) {
    let aggregate = [{
      $match: {
        userId,
        is_vaild: '0',
        is_pay: '1',
        is_ship: '0',
        is_end: '0'
      }
    },{
      $sort:{
        "meta.createdAt": -1
      }
    }]
   return this.pageQuery(orderModel, aggregate, param.page, param.pageSize)
  }
}