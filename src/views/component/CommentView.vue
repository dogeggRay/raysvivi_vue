<template>
  <div class = "inner-container">
    <el-divider class="comment-divider" content-position="left">Leave your footprints<el-icon ><EditPen /></el-icon></el-divider>
     <el-row>
      <el-col :span="24"></el-col>
    </el-row> 
    <el-row style="margin-bottom:10px">
         <el-col :span="8"  style="padding-right:10px">
          <el-input
              v-model="commentBody.writerName"
              placeholder="昵称"
          />
        </el-col>
        <el-col :span="8" style="padding-right:10px">
          <el-input
              v-model="commentBody.writerEmail"
              placeholder="邮箱"
          />
        </el-col>
        <el-col :span="8"  style="padding-right:10px">
          <el-input
              v-model="commentBody.writerUrl"
              placeholder="主页URL"
          />
        </el-col>
        </el-row>
        <el-row style="margin-bottom:10px">
          <el-col :span="24" style="padding-right:10px">
            <el-input
                v-model="replyCommentBody.content"
                :rows="3"
                resize="none"
                type="textarea"
                :maxlength="500"
                placeholder="(必填)评论内容为2到500个字符！"
            />
          </el-col>
           
        </el-row>
        <el-row>
          <el-col :span="24" style="padding-right:10px" >
            <el-button style="height:100%;width:100%" type="primary" @click="submitReply">提交</el-button>
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
              empty-text="没有留言 你是第一个 O_o"
              default-expand-all>
            <template #default="{ node }">
              <el-container>
                <el-aside width="50px"><el-avatar :size="30"> <el-icon><Avatar /></el-icon> </el-avatar></el-aside>
                <el-main>
                  <el-row @click="treeNodeClick(node)">
                    <el-col :span="24">
                      <span class="commentHeader">{{ node.data.writerName }}</span>
                      <!-- <span class="commentExtend">&nbsp;&nbsp;{{ node.data.writerEmail }}</span> -->
                      <span v-if="node.data.writerUrl" >&nbsp;&nbsp;<a target="_blank" style="color: var(--el-tree-text-color);" :href="'http://'+node.data.writerUrl">{{node.data.writerUrl}}</a></span>
                      <el-icon v-if="store.getters['accessToken']" style="float:right" @click="pageDeleteComment(node.data.id)"><Close /></el-icon>
                    </el-col>
                  </el-row>
                  <!-- <el-row class="commentExtend">
                    <el-col :span="6">
                      <span v-if="node.data.writerUrl" ><a target="_blank" style="color: var(--el-tree-text-color);" :href="'http://'+node.data.writerUrl">{{node.data.writerUrl}}</a></span>
                      
                      </el-col>
                  </el-row> -->
                  <el-row class="commentExtend">
                    <el-col :span="6">{{ node.data.createTime }}</el-col>
                  </el-row>
                  <div class="commentContent" >{{ node.label }}</div>
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
              v-model="commentBody.writerName"
              placeholder="昵称"
          />
        </el-col>
        <el-col :span="8" style="padding-right:10px">
          <el-input
              v-model="commentBody.writerEmail"
              placeholder="邮箱"
          />
        </el-col>
        <el-col :span="8"  style="padding-right:10px">
          <el-input
              v-model="commentBody.writerUrl"
              placeholder="主页URL"
          />
        </el-col>
        </el-row>
        <el-row style="margin-bottom:10px">
          <el-col :span="24" style="padding-right:10px">
            <el-input
                v-model="replyCommentBody.content"
                :rows="3"
                resize="none"
                type="textarea"
                :maxlength="500"
                placeholder="(必填)评论内容为2到500个字符！"
            />
          </el-col>
           
        </el-row>
        <el-row>
          <el-col :span="24" style="padding-right:10px" >
            <el-button type="primary" style="height:100%;width:100%" @click="submitReply">提交</el-button>
          </el-col>     
        </el-row>
      </el-drawer>

    </div>
</template>
    
<script lang="ts" setup>
import { ref ,reactive,onMounted ,defineProps ,watch,onUpdated} from 'vue'
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
      default:"-1"
    }
  })

  // const props = defineProps<{
  //   visible: string,required: true;
  //   relativeId: string
  // }>()
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

  onUpdated(() => {
        initCommentList()
  })

  onMounted(() => {
    setTimeout(() => {
        initCommentList()
    }, 500);
    commentBody.writerName = getStorageValue("writerName")==null?"":getStorageValue("writerName")+""
    commentBody.writerUrl = getStorageValue("writerUrl")==null?"":getStorageValue("writerUrl")+""
    replyCommentBody.writerName = getStorageValue("writerName")==null?"":getStorageValue("writerName")+""
    replyCommentBody.writerUrl = getStorageValue("writerUrl")==null?"":getStorageValue("writerUrl")+""
  })

  // watch(() => props, (newValue, oldValue) => {
  //   alert("watch:"+props.relativeId)
    
  // });

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
     
    if(isEmpty(body.content)){
        ElMessage.error("评论不能为空")
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

/deep/ .el-tree > .el-tree-node:not(:last-child){
  padding-top:5px;
  border-bottom: 1px solid #b1b3b8;
}

.comment-divider{
  margin-bottom:15px;
}
</style>