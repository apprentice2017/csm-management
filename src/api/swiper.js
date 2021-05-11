import request from '@/utils/request'
import qs from 'qs'

// 获取全部轮播图
export function allSwiper(data) {
  return request({
    url: '/api/swiper/get?' + qs.stringify(data)
  })
}

// 删除轮播图

export function removeSwiper(swiperId) {
  return request({
    url: '/api/swiper/remove?swiperId=' + swiperId,
    method: 'get'
  })
}

// 更新轮播图

export function updateSwiper(data) {
  return request({
    url: '/api/swiper/modify',
    method: 'post',
    data
  })
}

// 增加轮播图
export function addSwiper(data) {
  return request({
    url: '/api/swiper/add',
    method: 'post',
    data
  })
}
