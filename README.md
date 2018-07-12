# 基于Koa2的小程序后台
### 组织架构
- common //公共方法
  -  MiniPro.js  //小程序有关api
  -  Qiniu.js //七牛相关api
  -  Result.js //接口返回统一格式
  - Upload.js //上传文件
  - Util.js  //工具类
- middleware //中间件
  - Cors.js  //Cors 跨域
  - Interception //路由拦截器
  - Router.js //路由中间件
- database
  - MoDBConnection.js //mogoDB 链接
- controller  //接口 
- service  //服务
- dao //数据操作
- model  //mogoose model

# 功能实现
- [x] 小程序获取用户信息.
- [x] 七牛图片上传
- [x] 通过修饰符实现路由
- [x] mongoose 链接mongoDB
- [x] 路由拦截
- [x] 跨域设置

