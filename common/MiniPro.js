const request = require('request')
const crypto = require('crypto')
const { appConfig } = require('../appConfig.js')
//获取openId
export const getOpenId = (code) => {
    return new Promise((resolve, rej) => {
        const url = appConfig.baseUrl + '/sns/jscode2session?appid=' + appConfig.appId + '&secret=' + appConfig.appSecret + '&js_code=' + code + '&grant_type=authorization_code'
        request(url, (er, response, data) => {
            if (!er && response.statusCode == 200) {
                resolve(JSON.parse(data))
            } else {
                rej(er)
            }
        })
    })
}
//揭秘用户详细信息
export const resolveUserData = (sessionKey, appId, encryptedData, iv) => {
    var sessionKey = new Buffer(sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')

        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== appId) {
        throw new Error('Illegal Buffer')
    }

    return decoded
}
//获取用户详细信息
export const getUserInfo = async (code,userInfo) => {
    let openId = await getOpenId(code)
    console.log(openId,userInfo)
    let usersInfo = resolveUserData(openId['session_key'],appConfig.appId,userInfo.encryptedData,userInfo.iv)
    return {
        openId:openId.openid,
        userInfo:userInfo
    }
}

