import cropper from './src/main.js'

export default {
    install: (Vue) => {
        Vue.prototype.$cropper = cropper
    }
}
export {
    cropper
}
