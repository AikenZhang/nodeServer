const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressInfoSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    //用户Id
    userId:{
        type:String,
        required:true
    },
    //电话
    tel:{
        type:String
    },
    //名字
    name:{
        type:String
    },
    //性别
    sex:{
        type:String,
        default: '0' // 0:男士 1:女士
    },
    //地址
    address:{
        type:String
    },
    //是否默认
    default:{
        type:String,
        default: '0' // 0: 不默认 1: 默认
    },
    //删除标记
    is_vaild:{
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
addressInfoSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('fy_addressinfos',addressInfoSchema)