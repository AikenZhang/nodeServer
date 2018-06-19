const { UserDao } =require('../dao/UserDao.js')
const { ShopCarDao } = require('../dao/ShopCarDao.js')
const { createToken , getOpenId,deToken} = require('../common/MiniPro.js') 
const userDao =  new UserDao()
const shopCarDao = new ShopCarDao()
export class UserService {
    //微信用户登陆
    async wxLogin(code, userInfo) {
        //获取openId
        let userkey = await getOpenId(code)
        //保存详细信息
        let result = await userDao.login(userkey,JSON.parse(userInfo.rawData))
        if (result) {
         return Promise.resolve(createToken(userkey.openid))
        }
    }
    //平台用户登录
    async adminLogin (param) {
        let result = await userDao.adminLogin(param)
        console.log(result)
        console.log("1")
        if (result && result.length > 0) {
            let token = createToken(param.userName)
            return Promise.resolve(token)
        }else{
          return Promise.resolve(false)
        }
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