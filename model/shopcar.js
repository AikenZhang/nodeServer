const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopCarSchema = new Schema({
    //商品id
    id:{
        type:String,
        required:true
    },
    color:{
        type:String
    },
    size:{
        type:String
    },
    count:{
        type:Number,
        required:true
    },
    openId:{
        type:String
    },
    src:{
      type:String
    },
    title:{
        type:String
    },
    price:{
        type:Number
    },
    //删除标记 0：不删除  1: 删除
    is_vaild:{
        type:String,
        default:"0"
    },
    //是否已经生成了订单  0 ：否 1：是
    is_order: {
        type:String,
        default: '0'
    },
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
shopCarSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('fy_shopcars',shopCarSchema)