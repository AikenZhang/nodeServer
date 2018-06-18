const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColorSchema = new Schema({
    //颜色id
    key:{
        type:String,
        required:true
    },
    //颜色名称
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
ColorSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('fy_colors',ColorSchema)