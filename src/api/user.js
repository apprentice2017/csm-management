import request from '@/utils/request'
import qs from 'qs'

// 登录
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/api/user/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

// 查询全部用户信息

export function allUser(data) {
  return request({
    url: '/api/user/allUser?' + qs.stringify(data),
    method: 'get'
  })
}

// 更新用户信息

export function update(data) {
  return request({
    url: '/api/user/modify',
    method: 'post',
    data
  })
}

// 删除用户

export function removeUser(userId) {
  return request({
    url: '/api/user/delete?userId=' + userId,
    method: 'get'
  })
}
