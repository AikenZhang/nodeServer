const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    type:{
        type:[String]
    },
    title:{
        type:String
    },
    introduction:{
        type:String
    },
    size:{
        type:[String]
    },
    openId:{
        type:String
    },
    count:{
        type:Number
    },
    comment:{
        type:Number
    },
    is_vaild:{
        type:String
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
ProductSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('products',ProductSchema)