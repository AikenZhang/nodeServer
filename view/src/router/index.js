import Vue from 'vue'
import Router from 'vue-router'
const _import = path => () => import('@/page/' + path)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: _import('login/login.vue')
    },{
      path: '/upload',
      name: 'upload',
      component: _import('upload/upload.vue')
    }
  ]
})
