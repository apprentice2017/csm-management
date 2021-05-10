import request from '@/utils/request'
import qs from 'qs'

// 获取全部物品信息
export function allGoods(data) {
  return request({
    url: '/api/goods/allGoods?' + qs.stringify(data)
  })
}

// 更新用户信息

export function updateGoods(data) {
  return request({
    url: '/api/goods/modify',
    method: 'post',
    data
  })
}

// 删除物品

export function removeGoods(goodsId) {
  return request({
    url: '/api/goods/remove?goodsId=' + goodsId,
    method: 'get'
  })
}
