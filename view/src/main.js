// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import notice from '@/components/notice'
import loading from '@/components/loading'
import cropper from '@/components/cropper'
import imgpreview from '@/components/imgpreview'
Vue.use(MuseUI);
Vue.use(notice)
Vue.use(loading)
Vue.use(cropper)
Vue.use(imgpreview)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
