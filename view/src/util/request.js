import axios from 'axios'
import appConfig from "@/appConfig.js"
import { notice } from '@/components/notice'
const request = (option) => {
    return axios.request(Object.assign({
        method: 'post',
        baseURL: appConfig.baseUrl,
        timeout: appConfig.timeout,
        headers:{
            'Content-Type': 'application/json',
            'Author-Token': localStorage.getItem('token')
        }
    },option)).then((re) => {
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