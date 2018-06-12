//七牛 api
const qiniu = require('qiniu')
const UUid  = require('node-uuid')
const { appConfig } = require('../appConfig')
let mac = new qiniu.auth.digest.Mac(appConfig.qiniuAccessKey, appConfig.qiniuSecretKey);
let options = {
    scope: appConfig.qiniuBucket,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
}
let uploadToken = new qiniu.rs.PutPolicy(options).uploadToken(mac)
let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z1
let formUploader = new qiniu.form_up.FormUploader(config)
let putExtra = new qiniu.form_up.PutExtra()
export class QiNiu {
    //上传文件
    upLoadFile (file,fileName = UUid.v1()+'.jpg') {
        return new Promise((resolve,rej) => {
            formUploader.putStream(uploadToken, fileName, file, putExtra, function(respErr,
                respBody, respInfo) {
                if (respErr) {
                  throw respErr;
                }
                if (respInfo.statusCode == 200) {
                  resolve({
                      src: appConfig.qiniuBaseUrl + fileName,
                      respBody: respBody
                  })
                } else {
                  rej(respBody)
                }
              })
        }) 
    }
}