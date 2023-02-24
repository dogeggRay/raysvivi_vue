<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        <el-row>
          <el-col :span="24">关于</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">友情链接233</el-col>
        </el-row>
   <div style="" class="blogDetailDiv">
    <!-- 不知道为什么菜单栏自己消失了  good good-->
              <Toolbar
                :editor="editorRef"
              />
              <Editor
                style="height: 80%; overflow-y: hidden;"
                v-model="blog.content"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
              />
            </div>
        <el-row>
          <el-col :span="24"></el-col>
        </el-row>        
      </el-card>

    </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { ref ,reactive,onActivated,onBeforeUnmount,shallowRef,nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogDetail,getArtclePageList} from "@/js/blog.js"
import { ElMessage } from 'element-plus'
import { Editor } from '@wangeditor/editor-for-vue'

const blog = reactive({
    content:"",
    title:""
})
const route = useRoute()
const htmlValue = ""
const blogId = ref()
function handleChange (item) {
    console.log('change', item)
}
onActivated(() => {
  blogId.value = route.query.blogId
  getBlog()

})

const getBlog =() =>{
      getBlogDetail({id:blogId.value}).then((resp) => {
            if(resp.code == "0"){
              blog.content = resp.data.content
              initHtmlShow()
            }else{
                ElMessage.error(resp.msg)
            }
        })
        .catch((e) => {
          return
        })
} 

const initHtmlShow = () =>{
    return
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  return
})

//==========================================================================================
const editorRef = shallowRef()
    //工具栏不要：视频接入
    const toolbarConfig = {
      excludeKeys:[
        "group-video","redo","undo"
      ]
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
      nextTick(() => {
        editorRef.value = editor // 一定要用 Object.seal() ，否则会报错
      })
    }

    const editorConfig = { 
      placeholder: '请输入内容...' ,
      readOnly : true,
    }
</script>

<style lang="less" scoped>
// .el_main_first{
//   height:auto;
// }
.about-card{
  margin-left:10px;
  margin-right:10px;
}

.about-card >.el-card__body> .el-row{
  margin-bottom:15px;
}
</style>