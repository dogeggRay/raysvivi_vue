<template>
  <div class = "inner-container blog-write-div about-card fine-font">
    <el-row>
          <el-col :span="24">管理员博客模块</el-col>
        </el-row>
        <br/>
         <el-row>
          <el-col :span="1">
            </el-col>
          <el-col :span="2">
            博客列表
            </el-col>
            <el-col :span="10">
            <el-select v-model="relativeId" clearable class="m-2" placeholder="Select" @change="blogListChange">
              <el-option
                v-for="item in blogList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="24">&nbsp;</el-col>
        </el-row>
         <el-row>
          <el-col :span="24">&nbsp;</el-col>
        </el-row>
        <el-form :model="blogForm" label-width="120px" ref="blogFormRef">
          <el-row>
            <el-col :span="24">
                <el-form-item label="标题">
                  <el-input v-model="blogForm.title" />
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="摘要">
                  <el-input v-model="blogForm.abstractInfo" 
                  :rows="2"
                  type="textarea"
                  resize = "none"
                  maxlength="256"
                  placeholder=""/>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="标签">
                  <el-select v-model="blogForm.tags" multiple multiple-limit="5">
                    <el-option v-for="(tag,index) in store.getters['tagMap']"  :key="index" :label="tag[1]" :value="tag[0]"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="展示图片">
                    <el-upload
                      style="float:left;margin-left: 12px;"
                      ref="uploadRef"
                      class="upload-demo"
                      :action="uploadUrl"
                      :headers="uploadHeader"
                      :on-success="handleUploadSuccess"
                      :show-file-list="false"
                    >
                    
                      <el-image style="width: 100px; height: 100px" v-if="blogForm.image" :src="blogForm.image" class="avatar" />
                      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> 
                      <template #tip>
                        <div class="el-upload__tip" style="display: inline">
                          提示:请上传图片文件
                        </div>
                      </template>
                    </el-upload>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="正文">
                <wangEditor ref="editorInstance" :key="componentKey" style="height:500px" :outSideHtmlValue="blogForm.content"></wangEditor>
              </el-form-item>
            </el-col>
          </el-row>                    
        </el-form>
         <el-button type="primary" @click="submitHtml">提交</el-button><el-row>
          <el-col :span="24"></el-col>
        </el-row>      

    </div>
</template>

<script lang="ts" setup>
import wangEditor from "@/components/wangEditor/wangEditor.vue"
import fileComponent from "@/components/file/fileComponent.vue"
import { getBlogDetail,submitRichHtml,blogsSimpleList} from "@/js/blog.js"
import {baseURL} from '@/config'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import {isEmpty,initialReactive} from "@/utils/common.js"
import { ref ,reactive,onMounted,onBeforeUnmount,onUpdated,defineProps,onActivated, watch } from 'vue'
import store from '@/store'

const moduleId = ref()
const relativeId = ref()
const componentKey =ref(Date.now())
const blogList = ref([])
const route = useRoute()


onActivated(() => {
  componentKey.value = Date.now()
  initialReactive(blogForm)

  initBlogSimpleList()
})

// watch(() => route.query.relativeId, (newValue, oldValue) => {
//   relativeId.value = newValue
// });

const blogForm = reactive({
    id:null,
    title:"",
    abstractInfo:"",
    tags:[],
    image:"",
    module:"blogDetail",
    content:""
})

const operateType = ref("add")
const editorInstance = ref()
const blogFormRef = ref()

const uploadRef = ref()
const uploadHeader = {
  "Authorization": "Raysvivi " +store.getters['accessToken']
}
const uploadUrl = baseURL+"/api/file/uploadFile"
const handleUploadSuccess =(v1,response,v3,)=> {
  debugger
  if(response.response.code == "0"){
    ElMessage.success('上传成功')
    blogForm.image = response.response.data
  }else{
    ElMessage.error(response.response.msg)
  }
}

const initBlogSimpleList = () =>{
  blogList.value=[];
  blogsSimpleList().then((resp:any) => {
    blogList.value = resp.data
  }).catch((e) => {
          return
        })
}

const blogListChange = () =>{
  if(isEmpty(relativeId.value)){
    initialReactive(blogForm)
    editorInstance.value.setHtml("")
    return
  }
  pageGetBlogDetail()
}
const pageGetBlogDetail = () =>{
      getBlogDetail({aritcleInfoId:relativeId.value}).then((resp:any) => {
            if(resp.code == "0"){
              blogForm.id = resp.data.id
              blogForm.title = resp.data.title
              blogForm.abstractInfo = resp.data.abstractInfo
              blogForm.tags = resp.data.tags
              blogForm.image = resp.data.image
              blogForm.content = resp.data.content

              editorInstance.value.setHtml(resp.data.content)
            }else{
                ElMessage.error(resp.msg)
            }
        })
        .catch((e) => {
          return
        })
}

const getHtmlImpl = () => {
  let htmlval = editorInstance.value.getHtml()
  return htmlval
}

const submitHtml = () => {
  let richHtml = getHtmlImpl()
  blogForm.content = richHtml.value
    submitRichHtml(blogForm)
        .then((response:any) => {
          if(response.code == "0"){
            ElMessage.success('提交成功')
          }else{
            ElMessage.error(response.msg)
          }
        })
        .catch((e) => {
          return
        })
}
</script>

<style lang="less" scoped>
.about-card{
  margin-left:10px;
  margin-right:10px;
}

.about-card >.el-card__body> .el-row{
  margin-bottom:15px;
}
</style>