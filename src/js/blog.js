import request from '@/utils/request'
// import { get, getForDownLoadFile } from '../utils/request'

//提交富文本
export function submitRichHtml(data) {
    return request({
      url: '/api/admin/article/saveArtcle',
      method: 'post',
      data,
    })
}

//获取博客分页数据
export function getArtclePageList(data) {
    return request({
        url: '/api/tourist/article/getArtclePageList',
        method: 'post',
        data,
    })
}

export function getBlogDetail(params) {
    return request({
        url: '/api/tourist/article/blogDetail',
        method: 'get',
        params,
    })
}

export function blogsSimpleList(params) {
    return request({
        url: '/api/admin/article/blogsSimpleList',
        method: 'get',
        params,
    })
}

export function getSaysayList(data) {
    return request({
        url: '/api/tourist/saysay/getList',
        method: 'post',
        data,
    })
}

export function getLastSaysay(data) {
    return request({
        url: '/api/tourist/saysay/getLastSaysay',
        method: 'post',
        data,
    })
}

export function demoTest(data) {
    return request({
        url: '/api/admin/demo',
        method: 'post',
        data,
    })
}