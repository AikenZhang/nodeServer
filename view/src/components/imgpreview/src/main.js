import main from './main.vue'
import Vue from 'vue'
const imgpreview = (option) => {
    let options = option || {}
    let Instance = Vue.extend(main)
    let vm = new Instance()
    //提取配置
    for (let i in options ) {
        vm[i] = options[i]
    }
    let el = vm.$mount().$el
    document.body.appendChild(el)
}
export default imgpreview