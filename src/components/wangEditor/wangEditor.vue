<template>
<!-- {{valueHtml}} -->
   <div style="border: 1px solid #ccc;">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              />
              <Editor
                style="height: 80%; overflow-y: hidden;"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
              />
            </div>
</template>
<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick, defineProps,watch ,onBeforeMount,onActivated} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
import {baseURL} from '@/config'
import store from '@/store'


export default {
  components: { Editor, Toolbar },
  setup() {
      const outSideHtmlValue = ref()
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('')  
    // 模拟 ajax 异步获取内容
    onMounted(() => {
      //document.activeElement.blur();
        setTimeout(() => {
          //查看菜单栏配置
          // const toolbar = DomEditor.getToolbar(editorRef.value)
          // console.log(toolbar)
          //valueHtml.value = "<p>创建一对ssh key</p><pre><code >ssh-keygen -t rsa -C \"your_email@example.com\"</code></pre><p>把公钥添加到github上<br>选择自己项目所在文件夹<code>Git Bash Here</code></p><p>初始化git <code>git init</code></p><p>将项目添加到仓库<code>git add .</code></p><p>将项目提交到github<code>git commit -m \"注释\"</code><br><br>github新建项目，获取地址 <code>https://github.com/dogeggRay/raysvivi_springboot.git</code></p><p>远程管理git仓库<code>git remote add origin https://github.com/dogeggRay/raysvivi_springboot.git</code><br><br>============代码提交============</p><p><code>git commit -a -m \"提交代码\"</code><br><code>git push -u origin master</code><br>============代码拉取============</p><p><code>git clone xxx -b master</code><br>============gitignore失效===========</p><p><code>1. git rm -r --cached .</code></p><p><code>2. git add .</code></p><p><code>3.git commit -m 'update .gitignore'</code></p><p><code>4. git commit -m 'add .gitignore file'</code></p><p><img src=\"https://persional-images.oss-cn-hangzhou.aliyuncs.com/myblog/2023-02-1055379689319c43149baf78c7e7c18d8b.png\" alt=\"\" data-href=\"https://persional-images.oss-cn-hangzhou.aliyuncs.com/myblog/2023-02-1055379689319c43149baf78c7e7c18d8b.png\" style=\"\"/></p>"
        }, 1500)
    })

    //工具栏不要：视频接入
    const toolbarConfig = {
      excludeKeys:[
        "group-video","redo","undo"
      ]
    }
    const editorConfig = { 
      placeholder: '请输入内容...' ,
      autoFocus:false,
      MENU_CONF: {
        // 配置上传图片
        uploadImage: {
          server: baseURL+'/api/file/uploadFile', // 配置图片上传地址
          maxFileSize: 5 * 1024 * 1024, // 5M  图片大小限制
          fieldName: 'file', // 上传名字
          allowedFileTypes: [], // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
          // meta: {
          //   image_class_id: "2",
          //   file_type: "1",
          // },
          // 自定义设置请求头，比如添加token之类的
          headers: {
              "Authorization": "Raysvivi " +store.getters['accessToken']
          },
          
          // 上传进度的回调函数，可以用来显示进度条
          onProgress(progress: any) {
            // progress 是 0-100 的数字
            console.log('progress', progress)
          },
          // 单个文件上传成功之后
          onSuccess(file, res) {
              console.log(`${file.name} 上传成功`, res)
          },          

          // 单个文件上传失败
          onFailed(file: any, res: any) {
            console.log(`${file.name} 上传失败`, res)
          },       
          // 上传错误，或者触发 timeout 超时
          onError(file: any, err: any, res: any) {
            console.log(`${file.name} 上传出错`, err, res)
          },     
          // 插入图片到富文本编辑器回显
          customInsert(res: any, insertFn: any) {
            // res 即服务端的返回结果
            insertFn(res.data, '', res.data)
            // getPhotoUrl(res.data[0]).then((res) => {
            //   const url = res.data
            //   const alt = ''
            //   const href = res.data
            //   // 从 res 中找到 url alt href ，然后插入图片
            //   insertFn(url, alt, href)
            // })
          },                  
        },
        lineHeight:{
            lineHeightList: ['0.5','1', '1.5', '2', '2.5','3']
          },
      }
      
    }
    
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        handleDestory()
    })

    const handleDestory=()=>{
      const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    }
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
      nextTick(() => {
        editorRef.value = editor // 一定要用 Object.seal() ，否则会报错
      })
    }

    //对外暴露方法：获取html内容
    const getHtml = () => {
      return valueHtml
    }

    const setHtml = (htmlVal) => {
      valueHtml.value = htmlVal
    }
    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      getHtml,
      setHtml,
      handleCreated,
      handleDestory
    };
  }
}
</script>
<style lang="less" scoped>
/deep/ .w-e-text-container [data-slate-editor] p{
  margin:0px!important
}
</style>