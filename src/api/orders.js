import request from '@/utils/request'
import qs from 'qs'

// 获取全部物品信息
export function allOrders(data) {
  return request({
    url: '/api/orders/allOrders?' + qs.stringify(data)
  })
}

// 更新用户信息

export function updateOrder(data) {
  return request({
    url: '/api/orders/modify',
    method: 'post',
    data
  })
}

// 删除订单

export function removeOrder(ordersId) {
  return request({
    url: '/api/orders/removeOrders?ordersId=' + ordersId,
    method: 'get'
  })
}

// 取消订单

export function cancelOrder(ordersId) {
  return request({
    url: '/api/orders/cancelOrder?' + qs.stringify(ordersId),
    method: 'get'
  })
}
