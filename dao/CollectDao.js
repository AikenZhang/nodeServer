const mongoose = require('mongoose')
let collectModel = mongoose.model('fy_collects')
export class CollectDao {
  //添加收藏
  async addCollect(prodId,openId) {
    return new Promise((resolve, rej) => {
        collectModel.insertMany({
            id:prodId,
            openId
        }, (err, doc) => {
        if (!err) resolve(doc)
        else rej(err)
      })
    })
  }
  //获取收藏
  async getCollect (prodId,openId) {
      return new Promise((resolve,rej) => {
        if(prodId) {
            collectModel.find({
                id:prodId,
                openId
            },(err,doc) => {
                if(!err) resolve(doc)
                else rej(err)
            })
        }else{
            collectModel.find({
                openId
            },(err,doc) => {
                if(!err) resolve(doc)
                else rej(err)
            })
        }
      })
  }
  //删除收藏
  async deleteCollect (prodId,openId) {
    return new Promise((resolve,rej) => {
        collectModel.deleteOne({
            id:prodId,
            openId
        },(err,doc) => {
            if (!err) resolve(doc)
            else rej(err)
        })
    })
  }
}