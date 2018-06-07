import notice from './src/main.js'

export default {
    install: (Vue) => {
        Vue.prototype.$notice = notice
    }
}
export {
    notice
}
