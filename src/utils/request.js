import axios from 'axios'
import {baseURL} from '@/config'
//import store from '@/store'
 
const instance = axios.create({
  baseURL,	// 通过使用配置的proxy来解决跨域
  timeout: 5000
});
 
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("x-auth-token");
  if (token) {
    config.headers = {
      "x-auth-token": token
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
 
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export function getForDownLoadFile(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + url, {
        params: params,
        // headers: {
        //   Authorization: 'Nla ' + store.getters['user/accessToken'],
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
export default instance;