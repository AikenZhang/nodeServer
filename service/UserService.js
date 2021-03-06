const { UserDao } =require('../dao/UserDao.js')
const { ShopCarDao } = require('../dao/ShopCarDao.js')
const { AddressInfoDao } = require('../dao/addressInfoDao.js')
const { createToken,deToken} = require('../common/util.js') 
const { getOpenId } = require('../common/MiniPro.js')
const { CollectDao } = require('../dao/CollectDao.js')
const userDao =  new UserDao()
const shopCarDao = new ShopCarDao()
const addressInfoDao = new AddressInfoDao()
const collectDao = new CollectDao()
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
    // 平台用户注册
    async adminRegistry (param) {
        let a = await userDao.getInfoByUserId(param.userName,'2')
        if (a && a.length > 0) {
            return Promise.resolve({
                code: '-1',
                errMsg: '已经注册'
            })
        }
        return await userDao.registry(param)
    }
    //获取用户收货地址
    async getAddress (openId) {
        return addressInfoDao.getAddress(openId)
    }
   /**
    * 通过Id获取详细地址
    *
    * @param {*} id
    * @memberof UserService
    */
   async getAddressById (id) {
       return addressInfoDao.getAddressById(id)
   }
   //更新收货地址
   async updateAddress (param,openId) {
      return addressInfoDao.updateAddress(param,openId)
   }

   /**
    * 删除收货地址
    *
    * @param {*} id
    * @memberof UserService
    */
   async deleteAddress (id) {
        return addressInfoDao.deleteAddress(id)
   }
   //添加收货地址
   async addAddress (param,openId) {
    return addressInfoDao.addAddress(param,openId)
   }
    //获取用的收藏
    async getCollect (prodId,openId) {
        return collectDao.getCollect(prodId,openId)
    }
}