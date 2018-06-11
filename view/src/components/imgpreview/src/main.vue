<template>
    <div class="fy-imgpreview" @click="close">
        <img :src='src'/>
        <div class="fy-imgpreview-bbar">
            <i class="fa fa-trash-o" @click="deleteImg"></i>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                imgId:'',
                src: ''
            }
        },
        methods: {
            deleteImg () {
                let me = this
                console.log(me.imgId)
                if (me.delete) {
                    me.delete(me.imgId)
                }
            },
            close () {
                console.log(this.imgId)
                this.show = false
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el)
            }
        }
    }
</script>
<style>
.fy-imgpreview {
    position:fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:999;
    background: #000;
}
.fy-imgpreview img {
    width: 90%;
    margin:10% auto;
    display: block;
}
.fy-imgpreview-bbar{
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    font-size:25px;
    color:#fff;
    justify-content: center;
    align-items: center;
}
</style>
