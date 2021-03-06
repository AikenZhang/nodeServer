const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SizeSchema = new Schema({
    //尺寸id
    key:{
        type:String,
        required:true
    },
    //尺寸名称
    value:{
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
SizeSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('fy_sizes',SizeSchema)