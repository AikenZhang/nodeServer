import crop from './main.vue'
import Vue from 'vue'
const cropper = (options) => {
    let option = options || {}
    let Instance = Vue.extend(crop)
    let vm = new Instance()
    for (let i in option) {
        vm[i] = option[i]
    }
    let el = vm.$mount().$el
    document.body.appendChild(el)
}
export default cropper