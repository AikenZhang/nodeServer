const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')
const { QiNiu } = require('.//Qiniu.js')
const qiniu = new QiNiu()
/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */
function uploadFile( ctx ) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  return new Promise((resolve, reject) => {
    let formData = {
        fields:{},
        files:[]
    }
    //缓存七牛上传结果状态
    let qn = []
    // 解析表单中其他字段信息
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
        formData.fields = JSON.parse(val)
       
      });
    // 解析请求文件事件
    busboy.on('file',function(fieldname, file, filename, encoding, mimetype) {
       //七牛上传文件
       qn.push(qiniu.upLoadFile(file))
    })
    // 解析结束事件
    busboy.on('finish', function() {
      console.log(formData)
      Promise.all(qn).then((resultArr) => {
        formData.files = resultArr
        resolve(formData)
      })
    })
    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })
    req.pipe(busboy)
  })
}
export const uploader = uploadFile