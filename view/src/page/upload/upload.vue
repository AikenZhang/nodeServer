<template>
   <better-scroll class="fy-scroll">
        <mu-form ref="form" :model="validateForm">
        <mu-form-item prop="title" label="产品标题" >
          <mu-text-field v-model="validateForm.title" prop="title"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="产品价格" prop='price'>
        <mu-text-field placeholder="请输入产品价格" prefix="$" v-model.number='validateForm.price'></mu-text-field>
        </mu-form-item>
        <mu-form-item label="产品类别" prop='type' >
        <mu-select  multiple chips v-model="validateForm.type" full-width>
            <mu-option v-for="item in type" :key="item.typeId" :label="item.typeName" :value="item.typeId"></mu-option>
        </mu-select>
        </mu-form-item>
        <mu-form-item label="标签" prop='type' >
          <mu-select  multiple chips v-model="validateForm.tag" full-width>
              <mu-option v-for="item in type" :key="item.typeId" :label="item.typeName" :value="item.typeId"></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item label="产品尺寸" prop='size'>
          <mu-select  multiple chips v-model="validateForm.size" full-width>
              <mu-option v-for="item in type" :key="item.typeId" :label="item.typeName" :value="item.typeId"></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item label="产品星级" prop='start'>
          <mu-text-field placeholder="请输入产品星级" v-model.number='validateForm.start'></mu-text-field>
        </mu-form-item>
          <mu-form-item label="产品数量" prop='count'>
            <mu-text-field placeholder="请输入产品库存" v-model.number='validateForm.count'></mu-text-field>
          </mu-form-item>
        <mu-form-item prop='Introduction' label='商品详细说明'>
          <mu-text-field placeholder="不允许超过60个字符" v-model='validateForm.Introduction' multi-line :rows="3" :max-length="60"></mu-text-field>
        </mu-form-item>
        <mu-form-item label='选择图片' prop='files' >
          <upload v-model="validateForm.files" :choseImgCount = '1'></upload>
        </mu-form-item>
        <div class="fy-upload-but">
          <mu-button color="primary" @click="submit">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </div>
      </mu-form>
   </better-scroll>
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
      type: [
        {
          typeId: "001",
          typeName: "衣服"
        },
        {
          typeId: "002",
          typeName: "衣服"
        },
        {
          typeId: "003",
          typeName: "衣服"
        },
        {
          typeId: "004",
          typeName: "衣服"
        },
        {
          typeId: "005",
          typeName: "衣服"
        },
        {
          typeId: "006",
          typeName: "衣服"
        }
      ],
      validateForm: {
        title: "",
        price: 0,
        type: [],
        size: [],
        count: 0,
        introduction: "",
        files: [],
        start:0
      }
    }
  },
  methods: {
    submit () {
      let me = this
      // if (this.$refs.form.validate()){
        
      // }
      let files = me.validateForm.imgs
      let formData = new FormData()
      for (let i in me.validateForm) {
        if (i !== 'files'){
          formData.append(i,me.validateForm[i])
        }
      }
      for (let i in files) {
        formData.append(files[i].id,files[i].blob)
      }
       console.log(formData)
      request({
        url: 'admin/upload',
        data: formData
      }).then((data) => {
        console.log(data)
      })
    },
    clear () {
      
    }
  }
};
</script>
<style>
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
.mu-form-item__error .mu-form-item-help {
  color: #f9e79f;
}
.mu-form-item,
.mu-form-item-content {
  margin-bottom: 10px;
}
.fy-upload-but {
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>