<template>
  <div class="fy-scroll" ref="scroll">
  <slot></slot>
  <div ref="content"></div>
  <load-more type="load" v-if="loadImg"></load-more>
  <load-more type="end" v-if="end"></load-more>
  <empty v-if="empty"></empty>
</div>
</template>
<script>
import { Paging } from "./util.js";
import loadMore from '@/components/loadMore/index.vue'
import empty from '@/components/empty/index.vue'
let paging= ''
let types = ''
let sort = ''
let key = ''
let page = 1
let pageSize = 10
let param = ''
export default {
  props:{
    url:{
      type:String,
      default:''
    },
    param:{
      type: String,
      default: ''
    }
  },
  components:{
    loadMore,
    empty
  },
  data () {
    return {
       loadImg:false,
       end:false,
       empty:false
    }
   
  },
  mounted () {
    let url = this.url
    paging = new Paging({
      url
    })
    let me = this
    let windowHeight = window.screen.height
    console.log(me.$refs.scroll)
    me.$refs.scroll.addEventListener('scroll',function(){
        let scrollTop = this.scrollTop
        let height = me.$refs.content.offsetTop
        if ((scrollTop + windowHeight + 10) > height){
          me.loadData()
        }
    },false)
  },
  methods:{
    //初始化首页
    init (params) {
      let me = this
      param = params
      page = 1
        me.loadImg = false,
        me.end = false
      paging.setParam(param)
      paging.setLoading(true)
      paging.endLoad(() => {
         me.empty = true
      })
      paging.load(1).then((data) => {
         me.$emit('loadData',data)
      })
    },
    loadData () {
      let me = this
      page++
      paging.beforeLoad(() => {
          me.loadImg = true
      })
      paging.afterLoad(() => {
          me.loadImg = false
      })
      paging.endLoad(() => {
            me.end = true
      })
      paging.load(page).then((data) => {
        me.$emit('loadData',data)
      })
    }
  }
}
</script>

<style scoped>
.fy-scroll {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
