const mongoose = require('mongoose')
let ProductModel = mongoose.model('fy_products')
let TypeModel = mongoose.model('fy_types')
let SizeModel = mongoose.model('fy_sizes')
let ColorModel = mongoose.model('fy_colors')
const { BaseDao } = require('./BaseDao.js')
export class ProductDao extends BaseDao {
    //获取商品列表
    async getProdList (param) {
        if (param.prodId) {
            return new Promise((resolve,rej) =>{
                ProductModel.find({
                    is_vaild:'0',
                    id:param.prodId
                },(er,doc) => {
                    if (!er) resolve(doc)
                    else rej(er)
                })
            })
        }
        else if (param.type) {
            return new Promise((resolve,rej) =>{
                ProductModel.find({
                    type:{
                        "$in":type
                    },
                    is_vaild:'0'
                },(er,doc) => {
                    if (!er) resolve(doc)
                    else rej(er)
                })
            })
        }else {
            return new Promise((resolve,rej) =>{
                let query = [{
                    is_vaild: '0',
                },null,{
                    sort: {
                       "meta.createdAt":"desc"
                    }
                }]
                this.pageQuery(ProductModel,query,param.page,param.pageSize)
                .exec((err,doc) =>{
                    if (!err) resolve(doc)
                    else rej(err)
                })
            })
        }
        
        
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
    //获取产品类型
    async getType () {
        return new Promise((resolve,rej) => {
            TypeModel.find({},(err,doc) => {
                if(!err) resolve(doc)
                else rej(err)
            })
        })
    }
    //获取产品尺寸
    async getSize() {
        return new Promise((resolve,rej) => {
            SizeModel.find({},(err,doc) => {
                if(!err) resolve(doc)
                else rej(err)
            })
        })
    }

    //获取产品颜色
    async getColor () {
        return new Promise((resolve,rej) => {
            ColorModel.find({},(err,doc) => {
                if(!err) resolve(doc)
                else rej(err)
            })
        })
    }
}