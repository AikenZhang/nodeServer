import Loading from './main.vue'
import Vue from 'vue'
let vm;
let el;
const load = (options) => {
    let option = options || {}
    let Instance = Vue.extend(Loading)
    vm = new Instance()
    for (let i in option) {
        vm[i] = option[i]
    }
    el = vm.$mount().$el
    
}
load.prototype.show = function () {
    document.body.appendChild(el)
    return this
}
load.prototype.hide = function () {
    vm.close()
}
export default load