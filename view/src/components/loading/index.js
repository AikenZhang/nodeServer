import loading from './src/main.js'
export const load = (options) => {
    return new loading(options)
} 
export default {
    install (Vue) {
        let _load;
        Vue.prototype.$showLoading = (options) => {
            _load = new loading(options).show()
        }
        Vue.prototype.$hideLoading = () => {
            _load.hide()
        }
    }
}