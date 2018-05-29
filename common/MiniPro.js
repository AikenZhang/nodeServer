const request = require('request')
const { appConfig } = require('../appConfig.js')
const { cryptod, base64,resolveUserData} = require('../common/util.js')
//获取openId
export const getOpenId = (code) => {
    return new Promise((resolve, rej) => {
        const url = appConfig.baseUrl + '/sns/jscode2session?appid=' + appConfig.appId + '&secret=' + appConfig.appSecret + '&js_code=' + code + '&grant_type=authorization_code'
        request(url, (er, response, data) => {
            if (!er && response.statusCode == 200) {
                console.log(response)
                console.log(data)
                resolve(JSON.parse(data))
            } else {
                rej(er)
            }
        })
    })
}
//生成token
export const createToken = (openId) => {
    //let openId = await getOpenId(code)
    //过期时间
    const exp = () => {
        let nowDate = new Date().getTime()
        let expTime = 2 * 24 * 60 * 1000
        return nowDate + expTime
    }
    let payLoad = {
        exp: exp(),
        lat: new Date().getTime(),
        openId:openId
    }
    let head = {
        type: "JWT",
        alg: "AES"
    }
    let enString = base64.enCode(JSON.stringify(head)) + '.' + base64.enCode(JSON.stringify(payLoad))
    return enString + '.' + cryptod.crypto(enString, appConfig.serviceSecret)
}
//解析token
export const deToken = (token) => {
    return JSON.parse(base64.deCode(token.split('.')[1]))
}
//解析用户详细信息
export const getUserInfo = async (code,userInfo) => {
    let openId = await getOpenId(code)
    console.log(openId,userInfo)
    let usersInfo = resolveUserData(openId['session_key'],appConfig.appId,userInfo.encryptedData,userInfo.iv)
    return {
        openId:openId.openid,
        userInfo:userInfo
    }
}
