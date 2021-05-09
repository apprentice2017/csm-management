import request from '@/utils/request'
import qs from 'qs'

// 获取全部求购信息
export function allEssay(data) {
  return request({
    url: '/api/essay/allEssay?' + qs.stringify(data)
  })
}

// 更新用户信息

export function updateEssay(data) {
  return request({
    url: '/api/essay/addOrUpdate',
    method: 'post',
    data
  })
}

// 删除用户

export function removeEssay(essayId) {
  return request({
    url: '/api/essay/remove?goodsId=' + essayId,
    method: 'get'
  })
}
