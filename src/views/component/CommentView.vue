<template>
  <div class = "inner-container">
     {{moduleId}}
    <el-input
        v-model="content"
        :rows="2"
        type="textarea"
        placeholder="Please input"
    />
    </div>
</template>
    
<script lang="ts" setup>
import { ref ,reactive,onMounted ,defineProps} from 'vue'
import { getCommentList ,addComment} from '@/js/comment.js'
import { ElMessage } from 'element-plus'
  const props = defineProps({
    moduleId: {
      type: String,
      required: true
    }
  })

  const commentBody = reactive({
    moduleId:"",
    commentList:""
  })

  const content = ref("")

  onMounted(() => {
      //console.log(props.moduleId)
      initCommentList()
  })

  const initCommentList = () => {
    let param = {
      moduleId : props.moduleId,
      relativeId : ""
    }
    getCommentList(param).then((resp:any) => {
            if(resp.code == "0"){
              commentBody.commentList = resp.data
            }else{
                ElMessage.error(resp.msg)
            }
        }).catch()
  }
</script>

<style lang="less" scoped >

</style>