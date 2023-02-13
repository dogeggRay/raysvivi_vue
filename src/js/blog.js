import request from '@/utils/request'
// import { get, getForDownLoadFile } from '../utils/request'

//提交富文本
export function submitRichHtml(data) {
    return request({
        url: '/api/article/saveArtcle',
        method: 'post',
        data,
    })
}

//获取博客分页数据
export function getArtclePageList(data) {
    return request({
        url: '/api/article/getArtclePageList',
        method: 'post',
        data,
    })
}

export function getBlogDetail(data) {
    return request({
        url: '/api/article/blogDetail',
        method: 'post',
        data,
    })
}