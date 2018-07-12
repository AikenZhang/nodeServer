const _import = path => () => import('@/' + path)

export default [
    {
      path: '/',
      name: 'login',
      redirect:'/login'
    },{
      path: '/login',
      name: 'login',
      component: _import('page/login/login.vue')
    },
    {
      path: '/registry',
      name: 'registry',
      component: _import('page/login/registry.vue')
    },
    {
       path: '/index',
       name: 'index',
       redirect:'/upload',
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
    },{
      path: '/order',
      name: 'order',
      props:true,
      component: _import('page/user/order.vue')
    },
  ]