<template>
  <div class="fine-font">
    <el-date-picker 
          v-model="saysayRequest.startDateTime"
          type="year"
          placeholder="Pick a year"
          size="small"
          @change="refreshSaysay"
          value-format="YYYY-MM-DD hh:mm:ss "
         /><!--<span class="small-font">点击评论</span> -->
      <el-timeline class="saysayPicker" style="margin-top:20px;overflow-x: hidden;">
        <el-timeline-item :id="item.id" v-for="(item,index) in saysayList" :key="index" center :timestamp="item.createTime" placement="top">
          <el-card style="cursor:pointer;width:95%">
            <el-popover
                placement="bottom"
                trigger="click"
                popper-style="border:1px solid lightgray !important;"
                popper-class="commentPopper"
                :show-arrow = "false"
                @hide="popoverHide"
              >
                <template #reference>
                  <el-container>
                  <el-aside width="70%" style="border-right: dashed 1px lightgray;">
                      <h4>
                        <a v-if="item.link" style="font-style:italic" :href="item.link" target="_blank">{{item.context}}</a>
                        <span v-else class="fine-font">{{item.context}}</span>
                        
                        </h4>
                      <p class="fine-font">{{item.content}}<img v-if="item.meme" :src="item.meme" style="width: 40px;"/></p>
                    </el-aside>
                  <el-container style="width: 291px;">
                    <el-header style="padding:0px;height: auto;">
                      <div v-if="item.comments==null" class="small-font">暂无评论 </div>
                      <div v-if="item.comments!=null&&item.comments.length>=1" class="too-many-words" style="font-size:small;-webkit-line-clamp: 3;"><span style="background-color:lightgray">👤{{item.comments[0].writerName}}:</span><br/>{{item.comments[0].content}} </div>
                    </el-header>
                    <el-main><span v-if="item.comments!=null&&item.comments.length>1" class="small-font" style="float:right">more </span></el-main>
                  </el-container>
                </el-container>
                  <!-- <el-container>
                    <el-aside width="60%" style="border-right: dashed 1px lightgray;">
                      <h4>
                        <a v-if="item.link" style="font-style:italic" :href="item.link" target="_blank">{{item.context}}</a>
                        <span v-else class="fine-font">{{item.context}}</span>
                        
                        </h4>
                      <p class="fine-font">{{item.content}}<img v-if="item.meme" :src="item.meme" style="width: 40px;"/></p>
                    </el-aside>
                    <el-main style="padding-left:5px;display: flex;flex-direction: column;">
                      <span v-if="item.comments==null" class="small-font">暂无评论 </span>
                      <span v-if="item.comments!=null&&item.comments.length>=1" class="small-font too-many-words">{{item.comments[0].content}} </span>
                      <span v-if="item.comments!=null&&item.comments.length>1" class="small-font" >more </span>
                    </el-main>
                  </el-container> -->
                   </template>
                   

                   <!-- 弹框展示内容 -->
                   <el-row v-if="item.comments==null" class="fine-font">
                    <el-col :span="24">
                      暂无评论
                    </el-col>
                  </el-row> 
                  <el-row v-else v-for="(node,index) in item.comments" :key="index" class="fine-font">
                    <el-col :span="24">
                      <span style="background-color:lightgray">👤{{item.comments[0].writerName}}:</span>:{{node.content}} <span style="float:right;color: royalblue;">{{node.createTime.substring(0,10)}}</span>
                    </el-col>
                  </el-row> 
                   <el-row class="fine-font" style="margin-top:15px">
                    <el-col :span="24">
                      <el-input
                          placeholder="昵称"
                          v-model="saysayComment.writerName"
                          class="saysayCommentName"
                      />
                      <el-input style="margin-left:5px;"
                          placeholder="你的评论"
                          v-model="saysayComment.content"
                          class="saysayCommentContent"
                      />
                      <el-button class="saysayCommentSubmit fine-font" style="margin-left:5px;float:right" @click="commentSubmit(item.id)" type="primary">提交</el-button>
                    </el-col>
                  </el-row> 
              </el-popover>
          </el-card>
        </el-timeline-item>
      </el-timeline>
  </div>
</template>
<script lang="ts" setup>
import { ref ,reactive,onMounted} from 'vue'
import {getSaysayList} from "@/js/blog.js"
import { addComment} from '@/js/comment.js'
const saysayList = ref([])
const saysayRequest = reactive({
  startDateTime:"2023-01-01 00:00:01"
})
let saysayComment = reactive({
    moduleId:"saysay",
    parentId:"-1",
    relativeId:"",
    writerName:"",
    writerEmail:"",
    writerUrl:"",
    content:""
})

onMounted(() => {
  refreshSaysay()
})

const refreshSaysay = () =>{
  getSaysayList(saysayRequest).then((res)=>{
    saysayList.value = res.data;
  }).catch((err)=>{
    console.log(err)
  })
}

const commentSubmit = (id) =>{
  saysayComment.relativeId = id;
  addComment(saysayComment).then((resp:any) => {
            if(resp.code == "0"){
              refreshSaysay()
            }
        }).catch((err) => {
           console.log(err)
        })
}

const popoverHide = () =>{
  return
}
</script>
<style lang="less" scoped >
:deep(.el-timeline-item__timestamp){
    color: royalblue;
}


@media screen
and (min-device-width : 768px){
  .saysayPicker{
    margin-left:50px
  }
  .saysayCommentName{
    width:15%
  }

  .saysayCommentContent{
    width:68%
  }
  
  .saysayCommentSubmit{
    width:15%;
  }

}

@media screen
and (max-device-width : 768px) {
  .saysayCommentName{
    width:20%
  }

  .saysayCommentContent{
    width:60%;
  }

  .saysayCommentSubmit{
    width:15%;
  }

}

  :deep(.commentPopper){
    width:90%!important
  }

  .commentPopper{
    width:90%!important
  }
</style>
<style lang="less" >
@media screen
and (min-device-width : 768px){

  .commentPopper{
    width:51%!important
  }
}

@media screen
and (max-device-width : 768px) {


  .commentPopper{
    width:90%!important
  }
}
  </style>