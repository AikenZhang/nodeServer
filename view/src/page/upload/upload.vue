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

  </mu-form>
</template>
<script>
  export default {
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
        select:[]
      }
    },
    mounted() {

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