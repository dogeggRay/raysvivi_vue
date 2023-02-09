<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        
        <el-row>
          <el-col :span="24">博客撰写</el-col>
        </el-row>

        <el-form :model="form" label-width="120px" ref="blogFormRef">
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
                  <el-input v-model="blogForm.abstract" 
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
                <wangEditor ref="editorInstance"></wangEditor>
              </el-form-item>
            </el-col>
          </el-row>                    
        </el-form>
         <el-button type="primary" @click="submitHtml">提交</el-button>
        <!-- <fileComponent></fileComponent>
        <el-image style="width: 100px; height: 100px" src="https://persional-images.oss-cn-hangzhou.aliyuncs.com/headPortrait/2023-02-08601b9905b9f149f79b97938b49a628a8.webp" :fit="fit" /> -->
        <el-row>
          <el-col :span="24"></el-col>
        </el-row>        
      </el-card>

    </div>
</template>

<script lang="ts" setup>
import wangEditor from "@/components/wangEditor/wangEditor.vue"
import fileComponent from "@/components/file/fileComponent.vue"
import {submitRichHtml} from "@/js/test.js"
import {baseURL} from '@/config'
import { ElMessage } from 'element-plus'
import { ref ,reactive,onMounted,onBeforeUnmount } from 'vue'
const htmlValue = "<p><span style=\"background-color: rgb(235, 144, 58);\">模拟 Ajax 异步设置内容</span></p>"
const blogForm = reactive({
    title:"",
    abstract:"",
    image:"",
    content:""
})
const editorInstance = ref()
const blogFormRef = ref()

const uploadRef = ref()
const uploadHeader = {
  "Authorization":'Nla '
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
  let requestbody = {
    "title" : "我的第一篇blog",
    "content" : richHtml.value,
    "module" : "moduleTest",
    "tag" : "tagTest",
    "viewNum" : 0
  }
    submitRichHtml(requestbody)
        .then((res) => {
          return
        })
        .catch((e) => {
          return
        })
}
</script>

<style lang="less">
.about-card{
  height:800px;
  margin-left:10px;
  margin-right:10px;
}

.about-card >.el-card__body> .el-row{
  margin-bottom:15px;
}
</style>