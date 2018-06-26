const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    nickNam: {
        type: String
    },
    name: {
        type: String
    },
    CarID:{
        type: String
    },
    sex: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    passWord:{
        type:String
    },
    userType:{
        type:String
    },
    session_key: {
        type: String
    },
    //废除标记
    is_vaild:{
        type:String,
        default:0
    },
    imgUrl:String,
    tel: String,
    age: Number,
    wx:{
        type:String
    },
    wxQRcode:{
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
UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('fy_users',UserSchema)