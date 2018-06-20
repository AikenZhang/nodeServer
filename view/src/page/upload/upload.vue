<template>
        <mu-form ref="form" :model="validateForm">
        <mu-form-item prop="title" label="产品标题" :rules='rules.textFieldRules' >
          <mu-text-field v-model="validateForm.title" prop="title"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="产品价格" prop='price' :rules='rules.textFieldRules'>
        <mu-text-field placeholder="请输入产品价格" prefix="¥" v-model.number='validateForm.price'></mu-text-field>
        </mu-form-item>
        <mu-form-item label="产品类别" prop='type' :rules='rules.selectRules'>
        <mu-select  multiple chips v-model="validateForm.type" full-width>
            <mu-option v-for="item in type" :key="item.key" :label="item.value" :value="item.key"></mu-option>
        </mu-select>
        </mu-form-item>
        <mu-form-item label="颜色" prop='color' :rules='rules.selectRules'>
          <mu-select  multiple chips v-model="validateForm.color" full-width>
              <mu-option v-for="item in color" :key="item.key" :label="item.value" :value="item.key"></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item label="产品尺寸" prop='size' :rules='rules.selectRules'>
          <mu-select  multiple chips v-model="validateForm.size" full-width>
              <mu-option v-for="item in size" :key="item.key" :label="item.value" :value="item.key"></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item label="产品标签" prop='tag' :rules='rules.tagRules'>
           <mu-text-field placeholder='标签以","为间隔' v-model="validateForm.tag" prop="tag"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="产品星级" prop='start' :rules='rules.startRules'>
          <mu-text-field placeholder="请输入产品星级" v-model.number='validateForm.start'></mu-text-field>
        </mu-form-item>
          <mu-form-item label="产品数量" prop='count' :rules='rules.countRules'>
            <mu-text-field placeholder="请输入产品库存" v-model.number='validateForm.count'></mu-text-field>
          </mu-form-item>
        <mu-form-item prop='introduction' label='商品详细说明' :rules='rules.textFieldRules'>
          <mu-text-field placeholder="不允许超过60个字符" v-model='validateForm.introduction' multi-line :rows="3" :max-length="120"></mu-text-field>
        </mu-form-item>
        <mu-form-item label='选择图片' prop='files' :rules='rules.selectRules'>
          <upload v-model="validateForm.files" :choseImgCount = '1'></upload>
        </mu-form-item>
        <div class="fy-upload-but">
          <mu-button color="primary" @click="submit">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </div>
      </mu-form>
</template>
<script>
import upload from "@/components/upload";
import { BetterScroll } from "@/components/scroll";
import request from '@/util/request.js'
export default {
  components: {
    upload,
    BetterScroll
  },
  data() {
    return {
      rules:{
        textFieldRules:[
          { validate: (val) => !!val,message:'必须填写!' }
        ],
        selectRules:[
          { validate: (val) => val.length != 0, message: '至少选择一个!' }
        ],
        countRules:[
          {validate:(val) => val > 0, message: '数值必须大于0!'}
        ],
        startRules:[
          { validate:(val) => val < 6 && val > 0,message: '数值必须大于0,小于6'}
        ],
        tagRules: [
          { validate: (val) => val != '' && val.split(",").length > 0 && val.split(",").length < 4 , message: "至少添加一个标签,最多三个标签" }
        ]
      },
      size:[],
      type:[],
      color:[],
      validateForm: {
        title: "",
        price: 0,
        type: [],
        size: [],
        count: 0,
        introduction: "",
        files: [],
        start:0,
        tag:[],
        color:[]
      }
    }
  },
  methods: {
    submit () {
      let me = this
      console.log(me.validateForm.files.length)
      if (!this.$refs.form.validate()){
        return
      }
      let files = me.validateForm.files
      let formData = new FormData()
      let temp = {}
      for (let i in me.validateForm) {
        if (i !== 'files'){
          temp[i] = me.validateForm[i]
        }
        if (i == 'size') {
          temp[i] = me._Format(me.validateForm[i],me.size)
        }
        if (i == 'color') {
          temp[i] = me._Format(me.validateForm[i],me.color)
        }
        if (i == 'type') {
          temp[i] = me._Format(me.validateForm[i],me.type)
        }
      }
      formData.append("fields",JSON.stringify(temp))
      for (let i in files) {
        formData.append(files[i].id,files[i].blob)
      }
       me.$showLoading({
        message: "正在上传..."
      })
      request({
        url: 'admin/upload/upload',
        data: formData
      }).then((data) => {
        if (data.code == '0') {
           me.$hideLoading()
           this.$notice({
             type:'success',
             message: '上传成功'
           })
        }
        me.clear()
      })
    },
    clear () {
      this.validateForm = {
        title: "",
        price: 0,
        type: [],
        size: [],
        count: 0,
        introduction: "",
        files: [],
        start:0,
        tag:[]
      }
    },
    //重新格式化 size，type，color
    _Format (a,b) {
      let newData = []
       for (let i=0;i<a.length;i++){
         for (let e=0;e<b.length;e++){
            if (a[i] == b[e].key) {
              newData.push({
                "key":b[e].key,
                "value":b[e].value
              })
            } 
         }
       }
       return newData
    }
  },
  mounted () {
    let me = this
    request({
      url: 'product/getprodinfo'
    }).then((result) => {
      if (result && result.code == '0') {
         let data = result.data
         me.size = data.size
         me.color = data.color
         me.type = data.type
      }
    })
  }
};
</script>
<style scoped>
.fy-scroll {
  width: 100%;
  height: 100%;
}
.fy-col {
  height: 1rem;
}
.mu-form {
  width: 90%;
  margin: 15px auto;
}
.mu-form-item-label,
.mu-form-item-help {
  font-size: 14px;
  color: #333;
}
.mu-form-item,
.mu-form-item-content {
  margin-bottom: 10px;
}
.fy-upload-but {
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>