<template>
  <div class='fy-loadMore'>
    <div class='fy-loadMore-span'>
      <span v-if="type == 'end'">--</span>
      <div :class="iconClass" ></div>
      <span>{{text}}</span>
      <span v-if="type == 'end'">--</span>
    </div>
</div>
</template>
<script>
const types ={
  load:"fy-spin icon-ai244",
  end:"icon-xiangxia",
}
const text = {
  load:'加载中...',
  end:'到底了'
}
export default {
  props: {
    type:{
      type:String,
      default:"load"
    }
  },
  data:{
    text:'',
    iconClass:''
  },
  mounted () {
    let type = this.type
    this.iconClass ="iconfont "+text[type]
  }
}
</script>
<style>
.fy-loadMore {
  height:50rpx;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fy-spin{
  animation-name: goods-rotate;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-timing-function: linear;
  
}
@keyframes goods-rotate{
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
.fy-loadMore-text{
  display: flex;
  font-size:12px;
  color:#aaa;
}
</style>
