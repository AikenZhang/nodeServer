<template>
    <div class="fy-loading">
        <div class="fy-loading-mask"></div>
        <div class="fy-loading-content">
              <div class="fy-loading-message">{{message}}</div>
              <div class="fy-loading-icon">
                  <i class="fa fa-spinner fa-spin"></i>
              </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "loading",
  data() {
    return {
      message: "消息正在加载",
      show: false
    };
  },
  methods: {
    close() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
<style scoped>
.fy-loading {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.fy-loading-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.1;
}
.fy-loading-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  border-radius: 10px;
  min-height: 150px;
  background: #999;
}
.fy-loading-message {
  font-size: 18px;
  color: #fff;
  text-align: center;
  min-height: 80px;
  line-height: 80px;
  padding: 10px 0;
}
.fy-loading-icon {
  font-size: 30px;
  color: #fff;
  text-align: center;
}
</style>
