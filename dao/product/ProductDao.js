const mongoose = require('mongoose')
let ProductModel = mongoose.model('products')
export class ProductDao {
    //获取商品列表
    async getProdList (openId,type) {
        return new Promise((resolve,rej) =>{
            ProductModel.find({
                openId:openId,
                type:type,
                is_vaild:'1'
            },{
                id:1,
                type:1,
                title:1,
                introduction:1,
                size:1,
                count:1,
                comment:1
            },(er,doc) => {
                if (!er) resolve(doc)
                else rej(er)
            })
        })
        
    }
    //添加商品信息
    async saveProdInfo (info) {
        return new Promise((resolve,rej) => {
            ProductModel.insertMany({
                id:Date.now().toString(),
                ...info
            },(err,doc) => {
                if (!err) resolve(doc)
                else rej(err)
            })
        })
    }
}