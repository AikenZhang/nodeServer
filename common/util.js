const crypto = require('crypto');

//公用工具
export const cryptod = {
    //加密
    crypto: (content, key) => {
        const cipher = crypto.createCipher('aes192', key);
        let crypted = cipher.update(content, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
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

export const fyId = () => {
    let random = Math.floor(Math.random()*999) + 0
    return Date.now().toString() + random.toString()
}