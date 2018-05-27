const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    nickNam: {
        type: String,
        required:true
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
    openId: {
        type: String,
        required: true
    },
    session_key: {
        type: String,
        required: true
    },
    imgUrl:String,
    tel: String,
    age: Number,
    address: [String],
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

export const UserModel = mongoose.model('users',UserSchema)