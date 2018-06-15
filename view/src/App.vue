<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/reset.css';
@import './assets/font/fonts/iconfont.css';
@import 'cropperjs/dist/cropper.min.css';
html,body {
  height: 100%;
}
#app {
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
#app {
  background: #f6f6f6;
}
</style>
