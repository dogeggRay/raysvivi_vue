import request from '@/utils/request'

//查询评论列表
export function getCommentList(params) {
    return request({
      url: '/api/tourist/comment/list',
      method: 'get',
      params,
    })
}

//提交评论
export function addComment(data) {
    return request({
      url: '/api/tourist/comment/add',
      method: 'post',
      data,
    })
}

//提交评论
export function deleteComment(params) {
  return request({
    url: '/api/admin/comment/delete',
    method: 'get',
    params,
  })
}