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
      <mu-bottom-nav-item title="Recents" icon="restore"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="Favorites" icon="favorite"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>
    </mu-bottom-nav>
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
  margin-bottom:10px;
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
  background:#fff;
}
</style>

