import request from '@/utils/request'
import qs from 'qs'

// 获取全部可显示类别信息信息
export function allShow(data) {
  return request({
    url: '/api/category//getTopOneAll?' + qs.stringify(data)
  })
}

// 获取全部求购信息
export function allCategory() {
  return request({
    url: '/api/category/get'
  })
}

// 删除留言

export function removeCategory(categoryId) {
  return request({
    url: '/api/category/remove?categoryId=' + categoryId,
    method: 'get'
  })
}

// 更新类别
export function updateCategory(data) {
  return request({
    url: '/api/category/modify',
    method: 'post',
    data
  })
}

// 获取全部求购信息
export function allCategoryOne() {
  return request({
    url: '/api/category/getTopOne'
  })
}

// 添加分类信息
export function addCategory(data) {
  return request({
    url: '/api/category/add',
    method: 'post',
    data
  })
}
