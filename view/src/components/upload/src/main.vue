<template>
    <div class="fy-uploadItem">
        <div class="fy-upload-imgContent" @click="showPreview">
            <img v-for="item in imgs" :key='item.id' :src='item.src' :data-action='item.id' />
            <div class="fy-uploadItem-box">
                 <input ref='file' class="fy-upload-input" type="file" accept="image/*" multiple="" />
            </div>
        </div>
    </div>
</template>
<script>
import _ from "lodash";
export default {
  name: "uploadItem",
  model: {
    prop: 'imgs',
    event: "change"
  },
  props: {
    imgs: {
      type: Array
    }
  },
  mounted() {
    let me = this;
    if (this.$refs.file) {
      this.$refs.file.addEventListener("change", function(e) {
        let files = this.files;
        if (me.imgs.length + files.length > 9) {
          me.$notice({
            type: "error",
            message: "最多上传9张图片"
          })
          return
        }
        for (let i = 0; i < files.length; i++) {
          me._createDataUrl(files[i]).then(data => {
            me.$cropper({
              src: data,
              imgQuality: 0.1,
              create(data) {
                me.addImg({
                  id: Date.now(),
                  src: data
                })
              }
            })
          })
        }
        this.value = "";
      })
    }
  },
  methods: {
    //生成 dataUrl
    _createDataUrl(file) {
      return new Promise((resolve, rej) => {
        if (window.FileReader) {
          let fileReader = new FileReader();
          fileReader.onload = e => {
            resolve(e.target.result);
          };
          fileReader.onerror = e => {
            rej(e);
          };
          fileReader.readAsDataURL(file);
        }
      })
    },
    //显示大图
    showPreview({ target }) {
      let me = this;
      let imgId = target.dataset.action;
      let src = target.getAttribute("src");
      if (imgId) {
        this.$imgpreview({
          imgId,
          src,
          delete(id) {
            me.removeImg(id);
          }
        })
      }
    },
    //添加img
    addImg(img) {
      this.imgs.push(img);
      this.$emit('change',this.imgs)
    },
    //删除img
    removeImg(id) {
      _.remove(this.imgs, n => {
        return (n.id = id);
      })
      this.$emit('change',this.imgs)
    }
  }
};
</script>
<style scoped>
.fy-uploadItem {
  width: 100%;
}
.fy-uploadItem-box {
  position: relative;
  width: 1.5rem;
  height: 2rem;
  border: 1px solid #d9d9d9;
  margin: 10px;
  float: left;
}
.fy-uploadItem-box::before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
  width: 2px;
  height: 45px;
}
.fy-uploadItem-box::after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
  width: 45px;
  height: 2px;
}
.fy-upload-input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
}
.fy-upload-imgContent {
  display: flex;
  flex-wrap: wrap;
}
.fy-upload-imgContent img {
  width: 1.5rem;
  height: 2rem;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  margin: 10px;
}
.pr {
  width: 50px;
  height: 60px;
}
</style>
