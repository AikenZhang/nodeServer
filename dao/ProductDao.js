const mongoose = require('mongoose')
let ProductModel = mongoose.model('fy_products')
let TypeModel = mongoose.model('fy_types')
let SizeModel = mongoose.model('fy_sizes')
let ColorModel = mongoose.model('fy_colors')
const { BaseDao } = require('./BaseDao.js')
const _ = require('lodash')
export class ProductDao extends BaseDao {
    /**
     *获取商品列表
     *
     * @param {*} param
     * @returns
     * @memberof ProductDao
     */
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

    /**
     * 商品排序
     *
     * @param {*} type 商品类别
     * @param {*} key  依据什么排序
     * @param {*} sort  排序方式
     * @returns
     * @memberof ProductDao
     */
    async ProdSort (type,key,sort) {
        let key ={
            '01':'meta.createdAt',
            '02':'start',
            '03':'price'
        }
        //排序字段
        let field = key[key]
        let querSort = {}
        querSort[field] = sort
        return new Promise((resolve,rej) =>{
            ProductModel.find({
                type:{
                    "$in":type
                },
                is_vaild:'0'
            },null,querSort,(er,doc) => {
                if (!er) resolve(doc)
                else rej(er)
            })
        })
    }
    /**
     *添加商品信息
     *
     * @param {*} info
     * @returns
     * @memberof ProductDao
     */
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
    /**
     * 获取产品类型
     *
     * @returns
     * @memberof ProductDao
     */
    async getType () {
        return new Promise((resolve,rej) => {
            TypeModel.find({},(err,doc) => {
                if(!err) resolve(doc)
                else rej(err)
            })
        })
    }
   
    /**
     * 获取产品尺寸
     *
     * @returns
     * @memberof ProductDao
     */
    async getSize() {
        return new Promise((resolve,rej) => {
            SizeModel.find({},(err,doc) => {
                if(!err) resolve(doc)
                else rej(err)
            })
        })
    }


    /**
     * 获取产品颜色
     *
     * @returns
     * @memberof ProductDao
     */
    async getColor () {
        return new Promise((resolve,rej) => {
            ColorModel.find({},(err,doc) => {
                if(!err) resolve(doc)
                else rej(err)
            })
        })
    }
    /**
     * 通过Id 获取产品信息
     *
     * @param {Array} prodId
     * @memberof ProductDao
     */
    async getProdById (prodId) {
        return new Promise((resolve,rej) => {
            ProductModel.find({
                id:{
                    $in:prodId
                },
                is_vaild: '0'
            },(err,doc)=> {
                if(!err) resolve(doc)
                else rej(err)
            })
        })
    }
    //更改产品的数量
    async updateCount (countArr) {
        let result =[]
        _.forEach(countArr,(v,k) => {
            result.push(new Promise((resolve,rej) => {
                ProductModel.update({
                    id:v.id,
                    is_vaild: '0'
                },{
                  $set:{
                      count:v.count
                  }
                },(err,doc) =>{
                    if(!err)resolve(doc)
                    else rej(err)
                })
            }))
        })
      return Promise.all(result)
    }
}