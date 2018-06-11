import BetterScroll from './src/main.js'
export default {
  install (Vue) {
    Vue.component('scroll',Vue.extend(BetterScroll))
  }
}
export {
  BetterScroll
}