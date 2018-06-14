const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypeSchema = new Schema({
    //类型编号
    id:{
        type:String,
        required:true
    },
    //类型名称
    name:{
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
TypeSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('type',TypeSchema)