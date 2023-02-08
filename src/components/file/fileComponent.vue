<template>
    <el-upload
            style="float:left;margin-left: 12px;"
            ref="uploadRef"
            class="upload-demo"
            :action="uploadUrl"
            :headers="uploadHeader"
            :on-success="handleUploadSuccess"
            :show-file-list="false"
            >
            
            <el-button type="primary" style="float: left">导入设备</el-button>
            <template #tip>
                <div class="el-upload__tip" style="display: inline">
                <!-- 提示:支持格式为png、jpg -->
                </div>
            </template>
    </el-upload>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import {baseURL} from '@/config'
import store from '@/store'

const uploadUrl = baseURL+"/file/uploadFile"
const uploadHeader = {
    "Authorization":''
}
const uploadRef = ref()
const handleUploadSuccess =(v1,response,v3,)=> {
if(response.response.code == "0"){
    alert("OK")
}else{
    alert("NOK")
}
}
</script>