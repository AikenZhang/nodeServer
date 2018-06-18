const mongoose = require('mongoose')
let shopCarModel = mongoose.model('fy_shopcars')
export class ShopCarDao  {
    //添加购物车
    async addShopCar (info) {
        return new Promise((resolve,rej) => {
            shopCarModel.insertMany([
                {
                    id:info.id,
                    color:info.color,
                    size:info.size,
                    count:info.count,
                    userId:info.userId
                }
            ],(err,doc) => {
                if (!err) resolve(doc)
                else rej(err)
            })
        })
       
    }
}