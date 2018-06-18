const mongoose = require('mongoose')
const { UserDao } =require('../../dao/UserDao.js')
const { ShopCarDao } = require('../../dao/ShopCarDao.js')

const userDao =  new UserDao()
const shopCarDao = new ShopCarDao()
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
    //添加购物车
    async addShopCar (info) {
        return shopCarDao.addShopCar(info)
    }
}