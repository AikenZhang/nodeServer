require('babel-core/register')()
require('babel-polyfill')
const { QiNiu } = require('../common/Qiniu.js')
const { resolve } = require('path')
const fs = require('fs')
let qiniu = new QiNiu()

let file = fs.createReadStream(resolve(__dirname,'../001.jpg'))
qiniu.upLoadFile(file).then((data) => {
    console.log(data)
})