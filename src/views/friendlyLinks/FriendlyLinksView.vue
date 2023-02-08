<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        
        <el-row>
          <el-col :span="24">关于</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">友情链接

          </el-col>
        </el-row>
        <el-button type="default" @click="getHtmlImpl"></el-button>
        <wangEditor ref="editorInstance"></wangEditor>
         <el-button type="primary" @click="submitHtml">Primary</el-button>
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
import { ref ,onMounted,onBeforeUnmount } from 'vue'
let content = ref('')
const editorInstance = ref()
function handleChange (item) {
    console.log('change', item)
}

const getHtmlImpl = () => {
  let htmlval = editorInstance.value.getHtml()
  return htmlval
}

const submitHtml = () => {
  let richHtml = getHtmlImpl()
    submitRichHtml({"richHtml" : richHtml})
        .then((res) => {
          alert(1)
        })
        .catch((e) => {
          alert(12)
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