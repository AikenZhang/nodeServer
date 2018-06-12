<template>
    <div class="fy-crop">
        <img ref='img' style="width:100%;" :src="src"/>
         <div class="fy-crop-tbar" @click="click" >
            <i data-action='ok' class="fa fa-check fy-crop-tbar-but"></i>
            <i data-action='rotate-left' class="fa fa-rotate-left"></i>
            <i data-action='rotate-right' class="fa fa-rotate-right"></i>
            <i data-action='flip-horizontal' class="fa fa-arrows-h"></i>
            <i data-action='flip-vertical' class="fa fa-arrows-v"></i>
            <i data-action='close' class="fa fa-close fy-crop-tbar-but"></i>
         </div>
    </div>
</template>
<script>
import Croper from "cropperjs";
export default {
  name: "cropper",
  data() {
    return {
      type: "dataUrl", //  dataUrl || blob
      imgType: "image/png", // image/png || image/jpeg
      imgQuality: 0.3, //生成图片的质量  当type为dataUrl的时候起作用 0 ~ 1
      src: ""
    };
  },
  methods: {
    ok() {
      let me = this;
      me.$showLoading({
        message: "正在裁剪..."
      })
      if (me.type == "blob") {
        me.cropper.getCroppedCanvas().toBlob(data => {
          me.$hideLoading();
          if (me.create) {
            me.create(data);
          }
        },'image/jpeg',me.imgQuality);
      } else {
        let dataUrl = me.cropper
          .getCroppedCanvas()
          .toDataURL(me.imgType, me.imgQuality);
        me.$hideLoading();
        if (me.create) {
          me.create(dataUrl);
        }
      }
     me._destroy()
    },
    _destroy() {
      delete this.cropper
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    click({ target }) {
      let cropper = this.cropper;
      let action = target.dataset.action || target.parentNode.dataset.action;
      switch (action) {
        case "rotate-left":
          cropper.rotate(-90);
          break;
        case "rotate-right":
          cropper.rotate(90);
          break;
        case "flip-horizontal":
          cropper.scaleX(-cropper.getData().scaleX || -1);
          break;
        case "flip-vertical":
          cropper.scaleY(-cropper.getData().scaleY || -1);
          break;
        case "ok":
          this.ok();
          break;
        case "close":
          this._destroy();
          break;
      }
    }
  },
  mounted() {
    this.cropper = new Croper(this.$refs.img, {
      aspectRatio: 6 / 8,
      background: false,
      dragMode: "move",
      autoCropArea: 0.9,
      cropBoxMovable: false,
      cropBoxResizable: false
    });
  }
};
</script>
<style scoped>
.fy-crop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: #000;
}
.fy-crop-tbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1rem;
  z-index: 100;
  color: #fff;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fy-crop-tbar i {
  margin: 0 15px;
}
.fy-crop-tbar-but {
  width: 100px;
  text-align: center;
}
</style>
