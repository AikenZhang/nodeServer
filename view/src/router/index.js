import Vue from 'vue'
import Router from 'vue-router'
import routes from './router.js'
import {token} from '@/util/common.js'
import { notice } from '@/components/notice'
Vue.use(Router)

//路由导航白名单
const passRoute = [
  '/login',
  '/registry'
]

const router = new Router({
  routes
})
//全局钩子拦截
router.beforeEach((to, from, next) => {
  if (passRoute.indexOf(to.fullPath) > -1) {
    next()
  } else {
    if (token.getToken('fy_token')) {
      next()
    }else {
      notice({
        type: 'error',
        message: '请登录'
      })
      next({path:'/login'})
    } 
  }
})
export default router
