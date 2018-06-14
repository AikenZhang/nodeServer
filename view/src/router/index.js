import Vue from 'vue'
import Router from 'vue-router'
const _import = path => () => import('@/' + path)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: _import('page/login/login.vue')
    },{
      path: '/uploadItem',
      name: 'uploadItem',
      component: _import('components/upload')
    },{
      path:"/up",
      name:'crop',
      component: _import('components/cropper/src/main.vue')
    },{
      path:"/loading",
      name:'load',
      component: _import('components/loading/src/main.vue')
    },{
      path:"/img",
      name:'img',
      component: _import('components/imgpreview/src/main.vue')
    },{
       path: '/index',
       name: 'index',
       component: _import('page/index/index.vue'),
       children:[
        {
          path: '/upload',
          name: 'upload',
          component: _import('page/upload/upload.vue')
        },{
          path: '/user',
          name: 'user',
          component: _import('page/user/user.vue')
        }
       ]
    }
  ]
})
