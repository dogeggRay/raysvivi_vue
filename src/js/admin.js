import request from '@/utils/request'
import { tokenName } from '@/config'
import { get, post } from '../utils/request'
import store from '@/store'
//登录
export function adminLogin(data) {
    return request({
        url: '/api/admin/login/login',
        method: 'post',
        data,
    })
}

export async function refreshToken() {
    return request({
      url: '/v1/common/refreshToken',
      method: 'post',
    })
  }

export function getUserInfo(accessToken, timeout) {
    //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
    let param = {
      [tokenName]: accessToken,
      timeout: timeout,
    }
    return get('/api/userstableAPI/getUserInfo', param)
  }
  
  export function logout() {
    return request({
      url: '/v1/common/logout',
      method: 'post',
    })
  }

  export function getTags() {
      return request({
        url: '/api/constants/getTagEnums',
        method: 'get',
        params:null,
      })
  }

  export function getBloggerParameters() {
      return request({
        url: '/api/constants/getBloggerParameters',
        method: 'get',
        params:null,
      })
  }