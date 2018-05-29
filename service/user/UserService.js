const { UserModel } = require('../../model/user/UserModel.js')
const { MiniPro } =require('../../common/MiniPro.js')

export class UserService {
    //用户登陆
    async save (userInfo) {
        let data = JSON.parse(userInfo.rawData)
        return new Promise((resolve,rej) => {
            let user = new UserModel({
                nickNam: data.nickName,
                address: [
                    data.country + " " + data.city
                ],
                imgUrl: data.avatarUrl
            })
       
        })
    }
   
}