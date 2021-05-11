import request from '@/utils/request'
import qs from 'qs'

// 获取全部求购信息
export function allComments(data) {
  return request({
    url: '/api/comments/getAll?' + qs.stringify(data)
  })
}

// 删除留言

export function removeComment(commentId) {
  return request({
    url: '/api/comments/remove?commentId=' + commentId,
    method: 'get'
  })
}
