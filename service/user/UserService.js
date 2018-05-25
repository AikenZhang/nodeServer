const { UserModel } = require('../..//model/user/UserModel.js')

export class UserService {
    //添加用户
    async addUser () {
        return new UserModel({
            name: "zhang",
            age: 18,
            sex: "nan",
            address: ["zhang","光"]
        }).save()
    }
   
}