const crypto = require('crypto');
const {appConfig} = require('../appConfig.js')
//公用工具
export const cryptod = {
    //加密
    crypto: (content, key) => {
        const cipher = crypto.createCipher('aes192', key);
        let crypted = cipher.update(content, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    //解密
    decrypted: (content, key) => {
        const decipher = crypto.createDecipher('aes192', key);
        var decrypted = decipher.update(content, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
//base64 编码
export const base64 = {
    enCode: (content) => {
        return new Buffer(content).toString('base64')
    },
    deCode: (content) => {
        return new Buffer(content, 'base64').toString()
    }
}
//生成token
export const createToken = (openId) => {
    //let openId = await getOpenId(code)
    //过期时间
    const exp = () => {
        let nowDate = new Date().getTime()
        let expTime = 7 * 24 * 60 * 60 * 1000
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
//获取唯一Id(数值型)
export const fyId = () => {
    let random = Math.floor(Math.random()*999) + 0
    return Date.now().toString() + random.toString()
}