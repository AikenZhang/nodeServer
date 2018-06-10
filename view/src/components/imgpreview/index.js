import imgpreview from './src/main.js'

export default {
    install: (Vue) => {
        Vue.prototype.$imgpreview = imgpreview
    }
}
export {
    imgpreview
}
