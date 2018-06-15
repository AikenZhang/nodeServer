<template>
  <div class="fy-user">
    <div class="fy-header">
      <div class='fy-user-left'>
          <mu-avatar :size="60">
            <img src="">
          </mu-avatar>
      </div>
      <div class='fy-user-right'>
        <div class='fy-user-name'>{{user.name}}</div>
        <div class='fy-user-editor' bind:tap="editor">我的资料<span class="fa fa-pencil-square-o"></span></div>
      </div> 
    </div>
    <mu-bottom-nav class="fy-user-order">
      <mu-bottom-nav-item title="待发货" icon=":iconfont icon-daifahuo"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="已发货" icon=":iconfont icon-yifahuo"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="全部订单" icon=":iconfont icon-quanbudingdan01"></mu-bottom-nav-item>
    </mu-bottom-nav>
    <mu-list>
      <mu-list-item class="fy-list-item" button :ripple="false">
        <mu-list-item-title>填写发货单</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value=":iconfont icon-jiantouyou"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item class="fy-list-item" button :ripple="false">
        <mu-list-item-title>账单</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value=":iconfont icon-jiantouyou"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
   </mu-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        img: '',
        name: 'aikenZhang'
      }
    }
  }
}
</script>
<style>

.fy-header{
  width:100%;
  height:2rem;
  background: #fff;
  display: flex;
  align-items: center;
  margin-bottom:8px;
}
.fy-user-left{
  padding: 0 20px;
}
.fy-user-img{
  width:1rem;
  height: 1rem;
  border-radius: 1rem;
  overflow: hidden;
}
.fy-user-right{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.fy-user-name{
  font-size:16px;
  color: #333;
  padding: 0 0 8rpx 0;
}
.fy-user-editor{
  height:30px;
  font-size:14px;
  color: #666;
  line-height: 30px;
}
.fy-user-editor span{
  font-size:13px;
  padding: 0 px;
}
.fy-user-order{
  width:100%;
  height:100rpx;
  font-size:16px;
}
.mu-bottom-item{
  color:#333;
}
.mu-bottom-item-active{
  color:#f981a7;
}
.fy-list-item{
  background: #fff;
  font-size:16px;
  margin-bottom: 1px;
}
</style>

