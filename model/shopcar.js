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
    userId:{
        type:String
    },
    is_vaild:{
        type:String,
        default:"0"
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