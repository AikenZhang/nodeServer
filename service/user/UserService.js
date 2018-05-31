const mongoose = require('mongoose')
const { UserDao } =require('../../dao/user/UserDao.js')

const userDao =  new UserDao()
export class UserService {
    //用户登陆
    async save(openId, userInfo) {
        let data = JSON.parse(userInfo.rawData)
        return userDao.login(openId,data)
    }

    //查找用户信息
    async getUserInfo (openId) {
        return userDao.getUserInfo(openId)
    }
    
}