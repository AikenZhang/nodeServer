<template>
  <div>
    <div class="fy-view">
      <router-view></router-view>
    </div>
    <mu-bottom-nav :value.sync="shift" shift class="fy-tab-button">
      <mu-bottom-nav-item value='upload'  title="发布新品" to="/upload" icon=":iconfont icon-msnui-cloud-upload" :exact="true"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="user"  title="个人中心"  to="/user" icon=":iconfont icon-geren-copy"></mu-bottom-nav-item>
  </mu-bottom-nav>
  </div>
</template>
<script>
export default {
 data () {
    return {
      shift: 'upload'
    }
}
}
</script>
<style scopd>
 .fy-tab-button {
   width:100%;
   height:1rem;
   position:fixed;
   bottom: 0;
   z-index:10;
   font-size:17px;
   background: #f981a7;
 }
 .mu-bottom-item {
   color:#fff;
 }
</style>
