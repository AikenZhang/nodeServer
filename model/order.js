const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    //订单批次Id
    id:{
        type:String,
        required:true
    },
    prodId:{
        type:String,
        required:true
    },
    //用户Id
    openId:{
        type:String
    },
    //商户Id
    userId:{
      type:String
    },
    //产品名称
    title:{
        type:String
    },
    //价格
    price:{
        type:Number
    },
    //数量
    count:{
        type:Number
    },
    size:{
        type:String
    },
    color:{
        type:String
    },
    //图片信息
    src:{
        type:String
    },
    //是否发货
    is_ship:{
        type:String,
        default: '0'
    },
    //删除标记 0：不删除  1: 删除
    is_vaild:{
        type:String,
        default:"0"
    },
    //是否支付
    is_pay: {
      type:String,
      default: '0'
    },
    //是否交易完成
    is_end:{
      type:String,
      default: '0'
    },
    //地址
    address: {
      type:String,
      required:true
    },
    //电话
    tel:{
      type:String,
      required:true
    },
    //订单人名字
    name:{
      type:String
    },
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})
//添加虚拟字段 1 表示未支付  2 表示 未收货  3  表示完成
OrderSchema.virtual('mode').get(function () {
    if (this.is_pay == '0' && this.is_vaild == '0' && this.is_ship== '0' && this.is_end == '0' ) {
        return '1'
    }else if (this.is_pay == '1' && this.is_ship == '1' && this.is_vaild == '0' && this.is_end == '0') {
        return '2'
    }else if (this.is_pay == '1' && this.is_ship == '1' && this.is_vaild == '0' && this.is_end == '1') {
        return '3'
    }
})
OrderSchema.set('toJSON', { virtuals: true })
OrderSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next() 
})
mongoose.model('fy_orders',OrderSchema)