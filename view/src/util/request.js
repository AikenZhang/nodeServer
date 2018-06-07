import axios from 'axios'
import appConfig from "@/appConfig.js"
// create an axios instance
const ax = axios.create({
    baseURL: appConfig.baseURL,
    timeout: appConfig.timeout,
    headers:{
        'Content-Type': 'application/json',
        'Author-Token': localStorage.getItem('token')
    }
  })
const request = (option) => {
    return axios.request(Object.assign({
        method: 'post',
        baseURL: appConfig.baseUrl,
        timeout: appConfig.timeout,
        headers:{
            'Content-Type': 'application/json',
            'Author-Token': localStorage.getItem('token')
        }
    },option)).then((data) => {
        if (data && data.code != '0') {
            if (data.code == '111') {
                
            }
        }
    })
}
  export default request