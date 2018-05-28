const {config} = require('../appConfig.js')
const request = require('request')
const { appConfig } = require('../appConfig.js')
const { cryptod,base64 } = require('../common/MiniPro.js')
export class MiniPro {
    //获取openId
    getOpenId (code) {
        return new Promise((resolve,rej) => {
            console.log(config)
            const url = config.baseUrl+'/sns/jscode2session?appid='+config.appId+'&secret='+config.appSecret+'&js_code='+code+'&grant_type=authorization_code'
            request(url,(er,response,data) => {
                if(!er && response.statusCode == 200){
                    console.log(response)
                    console.log(data)
                    resolve(data)
                }else{
                    rej(er)
                }
            })
        })
    }
    //获取token
    async getToken (code) {
        let openId = await this.getOpenId(code)
        //过期时间
        const exp = () => {
            let nowDate = new Date().getDay()
            let expTime = 2 * 24 * 60 * 1000
            return nowDate + expTime
        }
        let payLoad = {
            exp:exp(),
            lat:new Date().getTime(),
            id:openId,
        }
        let head = {
            type: "JWT",
            alg: "AES"
        }
        let enString = base64.enCode(head)+'.'+base64.enCode(payLoad);
        return enString + cryptod.crypto(enString,appConfig.serviceSecret)
    }
}