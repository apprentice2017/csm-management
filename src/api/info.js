import request from '@/utils/request'

// 获取全部物品信息
export function getInfo() {
  return request({
    url: '/api/info/get'
  })
}
