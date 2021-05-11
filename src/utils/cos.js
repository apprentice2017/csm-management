import request from '@/utils/request'

function getCos() {
  return request({
    url: '/api/cos/get'
  })
}

const COS = require('cos-js-sdk-v5')
const cos = new COS({
  // 必选参数
  getAuthorization: function(options, callback) {
    // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
    // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
    // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
    getCos().then(res => {
      const data = res.result
      if (!data) return console.error('credentials invalid')
      callback({
        TmpSecretId: data.tmpSecretId,
        TmpSecretKey: data.tmpSecretKey,
        XCosSecurityToken: data.sessionToken,
        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
        ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
      })
    })
  }
})
export default cos
