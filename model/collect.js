const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CollectSchema = new Schema({
    //产品id
    id:{
        type:String,
        required:true
    },
    //用户Id
    openId:{
        type:String,
        required:true
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
CollectSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('fy_collects',CollectSchema)