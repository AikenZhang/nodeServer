<template>
   <paging url='/admin/order/getorder' @loadData="loadData" ref="paging">
      <!-- <div style="height:1000px;border:1px solid #ff0"></div> -->
      <div style="height:300px;width:100%;">
         <slide :enable='true'>
        <div style="height:300px;width:100%;border:1px solid #ff0"></div>  
      </slide>
      </div>
     
   </paging>
</template>

<script>
import paging from '@/components/paging'
import slide from '@/components/slide'
//mode 1 未发货 2 已发货 3 完成
export default {
  name: 'order',
  components: {
    paging,
    slide
  },
  mounted () {
    let mode = this.$route.query.mode
    this.$refs.paging.init({
      mode
    })
  },
  methods: {
    loadData (data) {
     console.log(data)
    }
  }
}
</script>

<style>

</style>
