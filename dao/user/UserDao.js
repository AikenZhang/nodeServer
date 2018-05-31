const mongoose = require('mongoose')
let UserModel = mongoose.model('users')
export class UserDao {
    //登录
    async login(openId, userInfo) {
        return new Promise((resolve, rej) => {
            UserModel.findOne({ openId: openId.openid }, (er, adv) => {
                if (!er && !adv) {
                    UserModel.insertMany([
                        {
                            nickNam: userInfo.nickName,
                            address: [
                                userInfo.country + " " + userInfo.city
                            ],
                            openId: openId.openid,
                            session_key: openId.session_key,
                            imgUrl: userInfo.avatarUrl
                        }
                    ], (er, doc) => {
                        if (!er) resolve(doc)
                        else rej(doc)
                    })
                } else {
                    UserModel.update({
                        openId: openId.openid,
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

}