import axios from 'axios'
import appConfig from "@/appConfig.js"
import { notice } from '@/components/notice'
import { token } from './common.js'
const service = axios.create({
    baseURL: appConfig.baseUrl,
    timeout: appConfig.timeout,
    method: 'post'
  })
  // request interceptor
  service.interceptors.request.use(config => {
    config.headers['author-token'] = token.getToken()
    return config
  }, error => {
    console.log(error) // for debug
    Promise.reject(error)
})
const request = (option) => {
    return service.request(option).then((re) => {
        let resu = re.data
        if (resu && resu.code != '0') {
            if (resu.code == '111') {
                setTimeout(() => {
                    location.href = '/'
                }, 2000)
                throw new Error(resu.errMSg)
            }
        }else{
           return resu
        }
    }).catch((e) => {
        notice({
            type: 'error',
            message: e.message
        })
    })
}
export default request