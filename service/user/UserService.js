const { UserModel } = require('../../model/user/UserModel.js')
const { MiniPro } =require('../../common/MiniPro.js')

export class UserService {
    //用户登陆
    async login (code) {
        const miniproService = new MiniPro()
        let data = await miniproService.getOpenId(code)
        return new Promise((resolve,rej) => {
            if (data) {
                resolve(data)
            } 
        })
    }
   
}