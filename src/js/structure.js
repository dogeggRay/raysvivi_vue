import request from '@/utils/request'


export function getNameList(params) {
    return request({
      url: '/api/tourist/structure/getNameList',
      method: 'get',
      params,
    })
}

export function queryOneStruc(params) {
    return request({
      url: '/api/tourist/structure/queryOne',
      method: 'get',
      params,
    })
}

export function updateStruc(data) {
    return request({
      url: '/api/admin/structure/update',
      method: 'post',
      data,
    })
}

export function addStruc(data) {
    return request({
      url: '/api/admin/structure/add',
      method: 'post',
      data,
    })
}