<template>
  <div>
    <div class="fy-view">
      <router-view></router-view>
    </div>
    <mu-bottom-nav :value.sync="shift" shift class="fy-tab-button">
      <mu-bottom-nav-item value="movies" title="Movies" to="/upload" icon=":fa fa-cloud-upload"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="music" title="Music"  to="/user" icon=":fa fa-user"></mu-bottom-nav-item>
  </mu-bottom-nav>
  </div>
</template>
<script>
export default {
 data () {
    return {
      shift: 'movies'
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
