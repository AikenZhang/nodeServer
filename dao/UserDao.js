const mongoose = require('mongoose')
let UserModel = mongoose.model('fy_users')
//userType
//1 为微信用户
//2 为平台用户
export class UserDao {
    //微信登录
    async login(openId, userInfo) {
        return new Promise((resolve, rej) => {
            UserModel.findOne({
                UserId: openId.openid
            }, (er, adv) => {
                if (!er && !adv) {
                    UserModel.insertMany([{
                        nickNam: userInfo.nickName,
                        address: [
                            userInfo.country + " " + userInfo.city
                        ],
                        UserId: openId.openid,
                        session_key: openId.session_key,
                        imgUrl: userInfo.avatarUrl,
                        userType: '1'
                    }], (er, doc) => {
                        if (!er) resolve(doc)
                        else rej(doc)
                    })
                } else {
                    UserModel.update({
                        UserId: openId.openid,
                        userType: '1'
                    }, {
                        nickNam: userInfo.nickName,
                        address: [
                            userInfo.country + " " + userInfo.city
                        ],
                        session_key: openId.session_key,
                        imgUrl: userInfo.avatarUrl
                    }, (er, doc) => {
                        if (!er) resolve(doc)
                        else rej(er)
                    })
                }
            })
        })
    }

    //获取用户信息
    async getUserInfo(openId) {
        return new Promise((resolve, rej) => {
            UserModel.findOne({
                openId: openId,
            }, {
                nickNam: 1,
                name: 1,
                sex: 1,
                imgUrl: 1,
                tel: 1,
                age: 1,
                address: 1
            }, (er, doc) => {
                if (!er) resolve(doc)
                else rej(er)
            })
        })
    }
    //平台用户登录
    async adminLogin(param) {
        return new Promise((resolve, rej) => {
            UserModel.find({
                userId: param.userName,
                passWord: param.passWord,
                is_vaild: '0',
                userType: '2'
            },{
                passWord:1
            },(err,doc) => {
                if (!err) resolve(doc)
                else rej(err)
            })
        })
    }
    
    //通过userId 获取数据
    async getInfoByUserId (userId,userType) {
        return new Promise((resolve,rej) => {
            UserModel.find({
                userId: userId,
                is_vaild: '0',
                userType: userType
            },(err,doc) => {
                if (!err) resolve(doc)
                else rej(err)
            })
        })
    }
    //平台用户注册
    async registry (param) {
        let res = await this.getInfoByUserId(param.userName,'2')
        return new Promise((resolve,rej) => {
            UserModel.find({
                userId: param.userName,
                is_vaild: '0',
                userType: '2'
            },(err,doc) => {
                if (!err) resolve(doc)
                else rej(err)
            })
        })
    }
}