<template>
  <mu-form>
    <mu-form-item label="产品标题">
      <mu-text-field></mu-text-field>
    </mu-form-item>
     <mu-form-item label="产品类别">
     <mu-select  multiple chips v-model="select" full-width>
        <mu-option v-for="item in type" :key="item.typeId" :label="item.typeName" :value="item.typeId"></mu-option>
     </mu-select>
    </mu-form-item>
    <mu-form-item label="产品尺寸">
     <mu-select  multiple chips v-model="select" full-width>
        <mu-option v-for="item in type" :key="item.typeId" :label="item.typeName" :value="item.typeId"></mu-option>
     </mu-select>
    </mu-form-item>
    <mu-form-item label="产品数量">
     <mu-text-field placeholder="请输入产品库存"></mu-text-field>
    </mu-form-item>
    <mu-form-item label='商品详细说明'>
      <mu-text-field placeholder="不允许超过60个字符" multi-line :rows="3" :max-length="60"></mu-text-field>
    </mu-form-item>
    <upload v-model="imgs"></upload>
  </mu-form>
</template>
<script>
import upload from '@/components/upload'
  export default {
    components: {
      upload
    },
    data() {
      return {
        src: '@/assets/001.jpg',
        type:[
            {
                typeId:'001',
                typeName: '衣服'
            },{
                typeId:'002',
                typeName: '衣服'
            },{
                typeId:'003',
                typeName: '衣服'
            },{
                typeId:'004',
                typeName: '衣服'
            },{
                typeId:'005',
                typeName: '衣服'
            },{
                typeId:'006',
                typeName: '衣服'
            }
        ],
        select:[],
        imgs:[]
      }
    },
    mounted() {
      
    },
    updated () {
      console.log(this.imgs[0].src)
    }
  }

</script>
<style>
  .fy-col {
    height: 1rem;
  }
.mu-form {
  width:90%;
  margin:15px auto;
}
.mu-form-item-label,.mu-form-item-help{
  font-size:14px; 
  color:#333;
}
.mu-form-item__error .mu-form-item-help {
  color:#F9E79F;
}
.mu-form-item,.mu-form-item-content{
  margin-bottom:10px;
}
</style>