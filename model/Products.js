const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    //产品id
    id:{
        type:String,
        required:true
    },
    //产品类别
    type:{
        type:Array
    },
    //标题
    title:{
        type:String
    },
    //详细简介
    introduction:{
        type:String
    },
    //尺寸
    size:{
        type:Array
    },
    color:{
        type:Array
    },
    //价格
    price: {
        type:Number
    },
    //标签
    tag: {
        type:Array,
        default:[]
    },
    //星级
    start: {
        type:Number
    },
    //用户Id
    userId:{
        type:String
    },
    //产品库存
    count:{
        type:Number
    },
    //废除标记
    is_vaild:{
        type:String,
        default:0
    },
    //商品图片列表
    files:{
        type:Array,
        default:[]
    },
    //更新创建信息
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})
ProductSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('fy_products',ProductSchema)