import request from '@/utils/request'

//提交富文本
export function submitRichHtml(data) {
    return request({
      url: '/demo/demoSubmit',
      method: 'post',
      data,
    })
}