<template>
<div class='slide' >
    <div class='slide-cont' :style="style" @touchstart="handstart" @touchmove="handmove" @touchend="handend">
    <slot></slot>
    </div>
    <div class='slide-btn'>
        <div class='del-class' id="del" catchtap='_del'>删除</div>
    </div>
</div>
</template>

<script>
const winW = window.screen.width; // 屏幕宽度
const ratio = 640/winW //px && rpx 单位转换 (乘于 这个属性是 px 转换成 rpx)
export default {
  props: {
    // 是否显示喜欢按钮
    like: {           // 属性名
      type: Boolean,  // 类型（必填）,String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false  // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    //是否启用
    enable:{
      type:Boolean,
      value:true
    }
  },

  // 组件的初始数据
  data () {
    return {
    offset: 0, // 内容区域滑动的位移
    start: 0,  // 手指触屏的开始位置
    move: 0,   // 手指移动的位置
    btnWidth: 110,  // 按钮的宽度 
    lock: false,
    now: 0,         //为标记滑动位置设置的变量
  }
  },
  computed:{
     style () {
       return 'transform: translateX('+ this.offset + 'px)'
     }

  },
  watch:{
    offset (v) {
      console.log(1)
    }
  },
  // 组件的方法列表
  methods: {
    // 手指开始滑动
    handstart(e) {
      var that = this;
      that.start = e.changedTouches[0].clientX
      console.log(that.start)
    },
    // 手指滑动过程
    handmove(e) {
      var that = this;
      var offset = that.offset
      var start = that.start
      var width = that.btnWidth
      var lock = that.lock
      var move = that.move = e.changedTouches[0].clientX
      console.log(this.enable)
      if ((move - start) < -100 && this.enable) {
        
        if (move - start > -width) {
          console.log('2')
          that.start = start
          that.move = move 
          this.offset = that.now === 0 ? (move - start) * ratio : (move - start) * ratio - width
        }
      }
      else if (lock ) {
        if (move-start < width){
          console.log('3')
          that.start = start
          that.move = move
          this.offset = that.now == 0 ? (move - start) * ratio : (move - start) * ratio - width
        }
      }
    },
    // 手指结束滑动，然后抬起
    handend(e) {
      var that = this;
      var width = that.btnWidth
      if (this.offset < 0) {
        that.btnWidth = width
        this.offset = -width
        that.lock = true
      } else {
        this.offset = 0
        that.lock = false
        that.now = 0
      }
    },

    // 删除
    _del() {
      this.$emit('delete') //触发删除回调
      this.offset = 0
    }
  }
}
</script>

<style scoped>
/* components/slide-delete/slide-delete.wxss */
.slide{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    background: #ffffff;
}
.slide-btn{
    width: 100%;
    font-size: 28rpx;
    color: #ffffff;
    background: #ffffff;
    display: flex; 
    flex-direction: row-reverse;
   
}
.slide-btn div{
    width:110px;
    height: 100%;
    display: flex; 
    align-items: center;
    justify-content: center;
    font-size:13px;
}
.slide-btn div:nth-child(1){
    background: #ff4549;
}
.slide-cont{
    width: 100%;
    height:100%;
    display: flex;
    background: #ffffff;
    position: absolute;
    z-index: 1;
    transition: all 200ms ease-out;
}
</style>
