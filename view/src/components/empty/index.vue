
<template>
  <div class='fy-empty'>
   <img :src="imgPre+'empty.png'"></img>
   <span>没有相关数据</span>
</div>
</template>

<script>
 import config from '@/appConfig.js'
export default {
  data () {
    return {
      imgPre: config.imgPre
    }
  }
}
</script>

<style scoped>
.fy-empty{
  width:100%;
  height:100%;
  background:#fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size:14px;
  color: #888;
}
.fy-empty image{
  width:100%
}
</style>
