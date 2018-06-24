const mongoose = require('mongoose')
let shopCarModel = mongoose.model('fy_shopcars')
export class ShopCarDao  {
    /**
     *  获取购物车
     *
     * @param {*} openId
     * @memberof ShopCarDao
     */
    async getShopCar (openId) {
        return new Promise((resolve,rej) =>{
            shopCarModel.find({
                openId,
                is_vaild: '0',
                is_order: '0'
            },(err,doc) => {
                if(!err) resolve(doc)
                else rej(err)
            })
        })
    }


    
    /**
     * 添加购物车
     *
     * @param {*} info
     * @returns
     * @memberof ShopCarDao
     */
    async addShopCar (info) {
        return new Promise((resolve,rej) => {
            shopCarModel.insertMany([
                {
                    ...info
                }
            ],(err,doc) => {
                if (!err) resolve(doc)
                else rej(err)
            })
        })
    }
   /**
    * 在购物车中获取商品的信息
    *
    * @param {array} prodId
    * @param {*} openId
    * @returns
    * @memberof ShopCarDao
    */
   async getShopCarById (prodId,openId) {
        return new Promise((resolve,rej) => {
            shopCarModel.find({
                id:{
                    $in:prodId
                },
                openId:openId,
                is_vaild: '0',
                is_order: '0'
            },(err,doc) => {
                if (!err) resolve(doc)
                else rej(err)
            })
        })
   }
   //更新购物车数量
   async updateShopCarCount (openId,prodId,count) {
     return new Promise((resolve,rej) => {
        shopCarModel.update({
            openId,
            id:prodId,
            is_vaild: '0'
       },{
           $set:{
               count
           }
       },(err,doc) => {
        if(!err)resolve(doc)
        else rej(err)
       })
     }) 
   }
   //删除购物车
   async deleteShopCar (prodIdArr,openId) {
       return new Promise((resolve,rej) =>{
        shopCarModel.update({
            id:{
                $in:prodIdArr
            },
            openId,
            is_vaild: '0',
            is_order: '0'
        },{
            $set: {
                is_vaild: '1'
            }
        },(err,doc) => {
            if(!err) resolve(doc)
            else rej(err)
        })
       })  
   }
   //生成订单
   async toOrder (prodIdArr,openId) {
       return new Promise((resolve,rej) =>{
        shopCarModel.updateMany({
            id:{
                $in:prodIdArr
            },
            openId,
            is_vaild: '0',
            is_order: '0'
        },{
            $set: {
                is_order: '1'
            }
        },(err,doc) => {
            if(!err) resolve(doc)
            else rej(err)
        })
       })
   }
}