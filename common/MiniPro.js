const {config} = require('../appConfig.js')
const request = require('request')
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
}