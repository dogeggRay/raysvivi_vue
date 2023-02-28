<template>
  <div class = "inner-container blog-write-div">
      <el-card class="about-card fine-font" shadow="always">
        
        <el-row>
          <el-col :span="24">博客撰写</el-col>
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
                <wangEditor ref="editorInstance" style="height:500px"></wangEditor>
              </el-form-item>
            </el-col>
          </el-row>                    
        </el-form>
         <el-button type="primary" @click="submitHtml">提交</el-button><el-row>
          <el-col :span="24"></el-col>
        </el-row>        
      </el-card>

    </div>
</template>

<script lang="ts" setup>
import wangEditor from "@/components/wangEditor/wangEditor.vue"
import fileComponent from "@/components/file/fileComponent.vue"
import {submitRichHtml} from "@/js/blog.js"
import {baseURL} from '@/config'
import { ElMessage } from 'element-plus'
import { ref ,reactive,onMounted,onBeforeUnmount } from 'vue'
import store from '@/store'

const blogForm = reactive({
    title:"",
    abstractInfo:"",
    image:"",
    content:""
})
const editorInstance = ref()
const blogFormRef = ref()

const uploadRef = ref()
const uploadHeader = {
  "Authorization": "Raysvivi " +store.getters['accessToken']
}
const uploadUrl = baseURL+"/file/uploadFile"
const handleUploadSuccess =(v1,response,v3,)=> {
  debugger
  if(response.response.code == "0"){
    ElMessage.success('上传成功')
    blogForm.image = response.response.data
  }else{
    ElMessage.error(response.response.msg)
  }
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
            ElMessage.success('上传成功')
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