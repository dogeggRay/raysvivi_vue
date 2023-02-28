<template>
  <div class = "inner-container">
     <el-row>
      <el-col :span="24"></el-col>
    </el-row> 
    <el-row style="margin-bottom:10px">
      <el-col :span="8"  style="padding-right:10px">
        <el-input
            v-model="commentBody.writerName"
            placeholder="你的昵称"
        />
      </el-col>
      <el-col :span="8"  style="padding-right:10px">
        <el-input
            v-model="commentBody.writerUrl"
            placeholder="你的个人主页URL(选填)"
        />
      </el-col>
      <el-col :span="8">
        <el-input
            v-model="commentBody.writerEmail"
            placeholder="你的邮箱(选填)"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" >
        <el-input
            v-model="commentBody.content"
            :rows="2"
            resize="none"
            type="textarea"
            :maxlength="500"
            placeholder="评论内容为2到500个字符！"
        />
      </el-col>
      <el-col :span="2" >
        <el-button type="info" style="margin-left:10px;height:100%;width:80%" @click="submitNew">提交</el-button>
      </el-col>      
    </el-row>
    <br/>
    <el-row>
      <el-col :span="24">
          <el-tree 
              ref="commentTreeRef"
              node-key="id"
              :data="commentList" 
              :expand-on-click-node="false"
              :props="defaultProps" 
              style="border:none"
              default-expand-all>
            <template #default="{ node }">
              <el-container>
                <el-aside width="50px"><el-avatar :size="30"> <el-icon><Avatar /></el-icon> </el-avatar></el-aside>
                <el-main>
                  <el-row >
                    <el-col :span="24">
                      <span class="commentHeader">{{ node.data.writerName }}</span>
                      <span class="commentExtend">&nbsp;&nbsp;{{ node.data.writerEmail }}</span>
                      <el-icon v-if="store.getters['accessToken']" style="float:right" @click="pageDeleteComment(node.data.id)"><Close /></el-icon>
                    </el-col>
                  </el-row>
                  <el-row class="commentExtend">
                    <el-col :span="6">
                      <span v-if="node.data.writerUrl" ><a target="_blank" style="color: var(--el-tree-text-color);" :href="'http://'+node.data.writerUrl">{{node.data.writerUrl}}</a></span>
                      <!-- <span v-else>未填写个人站点</span> -->
                      </el-col>
                  </el-row>
                  <el-row class="commentExtend">
                    <el-col :span="6">{{ node.data.createTime }}</el-col>
                  </el-row>
                  <div class="commentContent" @click="treeNodeClick(node)">{{ node.label }}</div>
                </el-main>
              </el-container>

              
            </template>
          </el-tree>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"></el-col>
    </el-row>        
    

   

    
      <el-drawer
        v-model="commentDrawer"
        :title="drawerTitle"
        :direction="direction"
        :before-close="handleClose"
        custom-class="commentReplyDrawer"
      >
        <el-row>
          <el-col :span="24">评论</el-col>
        </el-row> 
        <el-row style="margin-bottom:10px">
          <el-col :span="8"  style="padding-right:10px">
            <el-input
                v-model="replyCommentBody.writerName"
                placeholder="你的昵称"
            />
          </el-col>
          <el-col :span="8"  style="padding-right:10px">
            <el-input
                v-model="replyCommentBody.writerUrl"
                placeholder="你的个人主页URL(选填)"
            />
          </el-col>
          <el-col :span="8">
            <el-input
                v-model="replyCommentBody.writerEmail"
                placeholder="你的邮箱(选填)"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" >
            <el-input
                v-model="replyCommentBody.content"
                :rows="2"
                resize="none"
                type="textarea"
                :maxlength="500"
                placeholder="评论内容为2到500个字符！"
            />
          </el-col>
          <el-col :span="2" >
            <el-button type="info" style="margin-left:10px;height:100%;width:80%" @click="submitReply">提交</el-button>
          </el-col>      
        </el-row>
      </el-drawer>

    </div>
</template>
    
<script lang="ts" setup>
import { ref ,reactive,onMounted ,defineProps ,onUpdated} from 'vue'
import { getCommentList ,addComment ,deleteComment} from '@/js/comment.js'
import { ElMessage } from 'element-plus'
import {isEmpty,setStorageObject,getStorageValue} from "@/utils/common.js"
import store from '@/store'
  const props = defineProps({
    moduleId: {
      type: String,
      required: true
    },
    relativeId: {
      type: String,
      default:"",
      required: true
    }
  })

  const commentTreeRef = ref()
  const defaultProps = {
    label:"content",
    children:"children",
    id:"id"
  }  
  const commentList = ref([])
  const replyCommentBody = reactive({
    moduleId:props.moduleId,
    parentId:"-1",
    relativeId:props.relativeId,
    writerName:"",
    writerEmail:"",
    writerUrl:"",
    content:""
  })

  const commentBody = reactive({
    moduleId:props.moduleId,
    parentId:"-1",
    relativeId:props.relativeId,
    writerName:"",
    writerEmail:"",
    writerUrl:"",
    content:""
  })

  const drawerTitle = ref("")
  const commentDrawer = ref(false)
  const direction = ref('rtl')

  onMounted(() => {
    initCommentList()
    
    commentBody.writerName = getStorageValue("writerName")==null?"":getStorageValue("writerName")+""
    commentBody.writerEmail = getStorageValue("writerEmail")==null?"":getStorageValue("writerEmail")+""
    commentBody.writerUrl = getStorageValue("writerUrl")==null?"":getStorageValue("writerUrl")+""
    replyCommentBody.writerName = getStorageValue("writerName")==null?"":getStorageValue("writerName")+""
    replyCommentBody.writerEmail = getStorageValue("writerEmail")==null?"":getStorageValue("writerEmail")+""
    replyCommentBody.writerUrl = getStorageValue("writerUrl")==null?"":getStorageValue("writerUrl")+""
  })

  onUpdated(() => {
    initCommentList()
  })  

  const initCommentList = () => {
    
    let param = {
      moduleId : props.moduleId,
      relativeId : props.relativeId
    }
    getCommentList(param).then((resp:any) => {
            if(resp.code == "0"){
              commentList.value = resp.data
            }else{
                ElMessage.error(resp.msg)
            }
        }).catch((err) => {
           ElMessage.error(err)
        })
  }

  const treeNodeClick = (node)=>{
    replyCommentBody.parentId = node.data.id
    drawerTitle.value="回复："+node.data.content
    replyCommentBody.content = "";
    commentDrawer.value = true
  }

  const handleClose = () =>{
    commentDrawer.value = false
    replyCommentBody.parentId = "-1"
  }
  const submitNew = ()=>{
    commentBody.relativeId = props.relativeId
    submit(commentBody)
  }
  const submitReply = ()=>{
    replyCommentBody.relativeId = props.relativeId
    submit(replyCommentBody)
  }  
  const submit = (body) =>{
    
    if(isEmpty(body.writerName)){
        ElMessage.error("请填写昵称!")
        return
    }
    setStorageObject(body)
    addComment(body).then((resp:any) => {
            if(resp.code == "0"){
              ElMessage.success("评论成功")
              commentDrawer.value = false
              initCommentList()
            }else{
                ElMessage.error(resp.msg)
            }
        }).catch((err) => {
           ElMessage.error(err)
        })
  }

  const pageDeleteComment = (commentId) => {
    console.log(commentId)
    deleteComment({
      commentId:commentId,
      relativeId:"-1",
      moduleId:props.moduleId,
    }).then((resp:any) => {
            if(resp.code == "0"){
              initCommentList()
            }else{
                ElMessage.error(resp.msg)
            }
        }).catch((err) => {
           ElMessage.error(err)
        })
  }
</script>

<style lang="less" scoped >
/deep/ .el-tree-node__content{
  height:auto;
  padding-bottom:10px
}

/deep/ .el-tree-node__expand-icon{
  display:none
}

/deep/ .el-tree-node__label{
  width:100%
}

.commentHeader{
  font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,STHeiti,WenQuanYi Micro Hei,Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-style:normal;
  font-weight:700
}

.commentExtend{
  font-size:12px;
  font-weight: 500;
}

.commentContent{
  height:auto;
  width:100%;
  white-space:pre-wrap;
  margin-top:10px;
  font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,STHeiti,WenQuanYi Micro Hei,Helvetica,Arial,sans-serif;
  font-size: 13px;
  color:black
}

/deep/ .el-drawer__header{
  padding-top: 60px
}

//大屏配置
@media screen
and (min-device-width : 768px){
    /deep/ .commentReplyDrawer{
      width:32%!important
    }

}

//小屏配置
@media screen
and (max-device-width : 768px) {
    /deep/ .commentReplyDrawer{
      width:100%!important
    }

}
</style>