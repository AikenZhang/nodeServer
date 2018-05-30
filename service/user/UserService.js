const mongoose = require('mongoose')
const { MiniPro } = require('../../common/MiniPro.js')

export class UserService {
    //用户登陆
    async save(openId, userInfo) {
        let data = JSON.parse(userInfo.rawData)
        let UserModel = mongoose.model('users')
        return new Promise((resolve,rej) => {
            UserModel.findOne({ openId: openId.openid }, (er, adv) => {
                if (!er && !adv) {
                   UserModel.insertMany([
                         {
                            nickNam: data.nickName,
                            address: [
                                data.country + " " + data.city
                            ],
                            openId: openId.openid,
                            session_key: openId.session_key,
                            imgUrl: data.avatarUrl
                        }
                    ],(er,doc) => {
                        if (!er) resolve(doc)
                        else rej(doc)
                    })
                } else {
                    UserModel.update({
                        openId:openId.openid,
                    },{
                        nickNam: data.nickName,
                        address: [
                            data.country + " " + data.city
                        ],
                        session_key: openId.session_key,
                        imgUrl: data.avatarUrl
                    },(er,doc) => {
                        if (!er) resolve(doc)
                        else rej(er)
                    })
                }
            })
        }) 
    }

    //查找用户信息
    async getUserInfo (openId) {
        return new Promise((resolve,rej) => {
            let UserModel = mongoose.model('users')
            UserModel.findOne({
                openId:openId,
            },{
                nickNam:1,
                name:1,
                sex:1,
                imgUrl:1,
                tel:1,
                age:1,
                address:1
            },(er,doc) => {
                if (!er) resolve(doc)
                else rej(er)
            } )
        })
    }
    
}