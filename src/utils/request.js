import axios from 'axios'
import store from '@/store'
import {baseURL} from '@/config'
import router from '@/router'
import { message } from 'ant-design-vue'
import qs from 'qs'
//import store from '@/store'
 
const instance = axios.create({
  baseURL,	// 通过使用配置的proxy来解决跨域
  timeout: 5000
});

/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = async (code, msg) => {
  if(code==401){
    console.log("handleCode error:need to login")
      // await store.dispatch('user/logout')
      // router.push('/login')
  }else if(code == 403){
      router.push({ path: '/401' }).catch((e) => {
        console.log("handleCode 403",e)
      })
  }else{
      message.error(msg || `后端接口${code}异常`)
  }

}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let token = store.getters['accessToken'];
  if (token) {
    config.headers = {
      "Authorization": "Raysvivi " +token
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
 
// 添加响应拦截器
instance.interceptors.response.use(response =>{

  // 对响应数据做点什么
  const { data, config } = response
  const { code, msg } = data
  if(response.status==200&&response.data==""){
    //void接口直接成功
    return Promise.resolve(data)
  }

    // 操作正常Code数组
    const codeVerificationArray = ["0",0]
    // 是否操作正常
    if (codeVerificationArray.includes(code)) {
      return Promise.resolve(data)
    } else {
      handleCode(code, msg)
      return Promise.reject(
        '请求异常拦截:' + JSON.stringify({ url: config.url, code, msg }) ||
          'Error'
      )
    }
}, error => {
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data.msg || message)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '后端接口连接异常'
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
      }
      message.error(message || `后端接口未知异常`)
      return Promise.reject(error)
    }
});

export function getForDownLoadFile(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + url, {
        params: params,
        // headers: {
        //   Authorization: 'Raysvivi ' + store.getters['user/accessToken'],
        // },
        responseType: 'blob',
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

//axios不支持直接下载，使用浏览器功能触发文件缓存功能
export function convertRes2Blob(response){
  // 提取文件名
  const fileName = response.headers['content-disposition'].match(
    /filename=(.*)/
  )[1]
  // 将二进制流转为blob
  const blob = new Blob([response.data], { type: 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(fileName))
  } else {
    try {
      // 创建新的URL并指向File对象或者Blob对象的地址
      const blobURL = window.URL.createObjectURL(blob)
      // 创建a标签，用于跳转至下载链接
      const tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = blobURL
    
      let decodeFileName = decodeURI(fileName);
      tempLink.setAttribute('download', decodeFileName)
      // 兼容：某些浏览器不支持HTML5的download属性
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
      }
      // 挂载a标签
      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
      // 释放blob URL地址
      window.URL.revokeObjectURL(blobURL)
    }catch(err){
      console.log(err);
    }
    
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + url, {
        params: params,
        headers: {
          Authorization: 'Raysvivi ' + store.getters['accessToken'],
        },
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  // console.log(contentType ? contentType: 'application/json')
  return new Promise((resolve, reject) => {
    axios
      .post(baseURL + url, params, {
        headers: {
          //'Content-Type': contentType,
        },
      })
      .then((res) => {
        if (res.data.code == 0) {
          resolve(res)
        } else {
          console.log(res)
          //message.error(res.data.msg)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default instance;