import request from '@/utils/request'

export function uploadImgFile(data) {
    return request({
      url: '/api/file/uploadImgFile',
      method: 'post',
      data,
    })
}