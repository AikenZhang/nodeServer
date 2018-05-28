const crypto = require('crypto');

//公用工具
export const cryptod = {
    //加密
    crypto: (content,key) => {
        const cipher = crypto.createCipher('aes192', key);
        let crypted = cipher.update(content, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypted: (content,key) => {
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
        return new Buffer(content,'base64').toString()
    }
}