import request from '@/utils/request'

//提交富文本
export function submitRichHtml(data) {
    return request({
        url: '/article/saveArtcle',
        method: 'post',
        data,
    })
}

//提交富文本
export function getArtclePageList(data) {
    return request({
        url: '/article/getArtclePageList',
        method: 'post',
        data,
    })
}