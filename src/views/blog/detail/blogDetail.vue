<template>
  <div class = "inner-container">
    <!-- const scriptSrc = "/tinymce/tinymce.min.js"; -->


       <el-icon v-if="fromFlag!=0" class="blogDetailClose" size="30" @click="closeClick"><CircleClose /></el-icon>
      <el-card class="about-card blog-detail-card" shadow="always">
        
        <div v-if="otherShow" class="fine-font breadcrumb">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/view' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客正文</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <el-row class="independent_row">
          <el-col v-if="fromFlag==0" :span="24" style="text-align: left;"><span class="title_level_1">{{blog.title}}</span></el-col>
          <el-col v-else :span="24" style="text-align: left;">
            <router-link class="title_level_1" style="text-decoration:underline" target="_blank" :to="{name:'blogDetail',query:{relativeId:outerRelativeId}}">
              <el-icon style="position:relative;top:5px;margin-right:10px" size="30"><Link /></el-icon>{{blog.title}}
            </router-link>   
          </el-col>
        </el-row>
        
        <!-- <el-row class="independent_row">
          <el-col :span="24">
            
          </el-col>
        </el-row> -->

        <el-row >
          <el-col :span="24" style="line-height: 33px;">
            <el-icon class="headerTipIcon"><Clock /></el-icon><span class="headerTipSpan">{{blog.createTime.substring(0,11)}}</span>&nbsp;&nbsp;  
            <el-icon class="headerTipIcon"><View /></el-icon><span class="headerTipSpan">{{ extendInfo.viewNum }}次浏览</span>&nbsp;&nbsp;  
          
            <template v-if="store.getters['tagMap']">
              <el-icon class="headerTipIcon"><PriceTag /></el-icon>
                    <el-tag style="margin-right:5px;cursor:pointer" v-for="(tag,index) in blog.tags" class="ml-2" type="info" :key="index" @click="tagClick(tag)">
                    {{store.getters['tagMap'].get(tag)}}</el-tag>
                  </template>
                  <template v-else><el-tag style="margin-right:5px" v-for="(tag,index) in blog.tags" class="ml-2" type="info" :key="index">
                    {{tag}}</el-tag></template>
            </el-col>

            
        </el-row>

        <el-divider content-position="left" ></el-divider>
        <el-row>
          <el-col :span="24">
            
          </el-col>
        </el-row>    
        <el-row>
          <el-col :span="24">
            <div v-html="blog.content" @click="contentClick($event)" style="padding-left:1%"></div>
            <!-- <div v-html="Prism.highlight(blog.content, Prism.languages.js)" class="fine-font" @click="contentClick($event)" style="padding-left:1%"></div> -->
            
          </el-col>
        </el-row>    

        <el-row v-if="otherShow" class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><CommentView :key="componentKey" :moduleId="'blogDetail'" :relativeId="blogId"/></el-col>
          <el-col :span="2"></el-col>
        </el-row>      
      </el-card>


      <ImageViewer ref="imageViewerRef" :imageUrls="imageUrls"/>
    </div>
</template>

<script lang="ts" setup>
import Prism from "prismjs";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { ref ,reactive,onActivated,onBeforeUnmount,onBeforeMount,shallowRef,nextTick,defineExpose,defineProps,defineEmits,onDeactivated } from 'vue'
import { getBlogDetail,getArtclePageList} from "@/js/blog.js"
import { pageExtendInfo} from "@/js/visitor.js"
import store from '@/store'
import { useStore } from 'vuex'
import {useRouter,useRoute} from 'vue-router'
import { ElMessage } from 'element-plus'
import { Editor } from '@wangeditor/editor-for-vue'
import CommentView from '@/views/component/CommentView.vue'
import ImageViewer from '@/views/component/image-viewer.vue'
//import {switchSideBar} from "@/js/common.js"
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({
  fromFlag:{
    type: Number,
    default:0//普通//1大纲
  },
  outerRelativeId:{
    type:String,
    default:""
  }
})

const imageViewerRef = ref()
const imageUrls = ref([""])

const outerEmits = defineEmits(['detailClose'])

const otherShow = ref(true)
const storeInstance = useStore()
const componentKey = Date.now()
const blog = reactive({
    content:"",
    title:"",
    createTime:"",
    id:"",
    tags:[],
    image:""
})

const extendInfo = reactive({
  viewNum:0
})
const route = useRoute()
const htmlValue = ""
const blogId = ref()
function handleChange (item) {
    console.log('change', item)
}

onActivated(() => {

  if(props.outerRelativeId!=""){
    blogId.value = props.outerRelativeId
  }else{
    blogId.value = route.query.relativeId
  }
  
  //switchSideBar(false)
  getBlog()
  initPageExtendInfo()
})

const router=useRouter()

const getBlog =() =>{
      getBlogDetail({aritcleInfoId:blogId.value}).then((resp:any) => {
            if(resp.code == "0"){
              blog.title = resp.data.title
              blog.id = resp.data.id
              blog.createTime = resp.data.createTime
              blog.image = resp.data.image
              blog.tags = resp.data.tags
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

const initPageExtendInfo =() =>{
  let body = {"moduleName":"blogDetail","relativeId":blogId.value}
  pageExtendInfo(body).then((resp:any) => {
        if(resp.code == "0"){
          extendInfo.viewNum = resp.data.viewNumber
        }else{
            ElMessage.error(resp.msg)
        }
    })
    .catch((e) => {
      return
    })
}
const initHtmlShow = () =>{
  setTimeout(() => {
        Prism.highlightAll()// 全局代码高亮
        scrollToSection(window.location.hash)
    }, 100)
}

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
      autoFocus: false
    }

    const tagClick = (tag) =>{
        storeInstance.commit('setCurrentTag',tag)
        router.push({path:"/view/blogList"})
    }

    const blogRefresh = (str: string) =>{
      otherShow.value = false
      blogId.value = str
      getBlog()
    }

    const closeClick = () =>{
        outerEmits("detailClose")
    }

    const clickImgUrl = ref("")
    const contentClick = (event) =>{
      if(event.target.localName=="img"){
        imageUrls.value = [event.target.currentSrc];
        imageViewerRef.value.imageShow()
      }
    }


    const scrollToSection = (anchor) =>{
      
      if(anchor==""){
        return
      }
    　　let section = document.getElementById(anchor.substring(1,anchor.length))
    　　if (section) {
    　　　　section.scrollIntoView()
    　　}
    }



defineExpose({
  blogRefresh
})

onDeactivated(()=>{
  imageViewerRef.value.imagesHide()
})
</script>

<style lang="less" scoped>
 @import url('@/assets/css/prism/prism-tomorrow.min.css');
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

/deep/ .w-e-text-container [data-slate-editor] p{
  margin:0px!important
}

/deep/ .w-e-text-container .w-e-scroll{
  overflow-y:hidden!important
}

//小屏
@media screen
and (max-device-width : 768px) {
  .blogDetailClose{
    position: fixed;right: 11%;z-index: 99;top: 18%;cursor:pointer
  }
  :deep(pre){
    font-size:x-small;
  }
}

@media screen
and (min-device-width : 768px) {
  .blogDetailClose{
    display:none
  }
  :deep(pre){
    font-size:smaller;
  }
}

:deep(img, video){
  width:100%;
  height:auto;
}

// :deep(.el-dialog__body){
//     padding:0px
// }

// :deep(.el-dialog__header){
//     display:none
// }

:deep(.el-drawer){
  background: transparent;
}

:deep(.el-drawer__body){
    padding: 0px;
}
</style>