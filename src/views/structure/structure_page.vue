<template>
  <div class = "inner-container">
    <el-card class="about-card fine-font" shadow="always" style="padding:0px">
        <el-container>
          <el-container>
                      <el-header style="background-color:#545c64">
                        <el-menu
                        mode="horizontal"
                          active-text-color="#ffd04b"
                          background-color="#545c64"
                          class="el-menu-vertical-demo"
                          text-color="#fff"
                          :default-active="0"
                        >
                          <el-menu-item v-for="(item,index) in structureList" :key="index" :index="index" @click="switchStruc(item.id)">
                            <el-icon><location /></el-icon>
                            <span>{{item.label}}</span>
                          </el-menu-item>
                        </el-menu>
                      </el-header>
                      <el-main id="echartsContainer4Struc" style="padding-left:5px;min-height:600px">


                            <el-divider content-position="left" ></el-divider>
                            <EchartsTree :echartsData="structureBody" @nodeClick="openArticle"></EchartsTree>
                            <el-divider content-position="left"></el-divider>
                                    <el-row class="independent_row">
                                      <el-col :span="24" style="text-align: left;">
                                        <span class="fine-font small-font" style="float:right"></span>
                                      </el-col>
                                    </el-row>
                      </el-main>
                    </el-container>
        </el-container>

    

    </el-card>



<!-- 明细弹框     -->
    <el-dialog
      v-model="showDetail"
      destroy-on-close
      show-close
      class="content-dialog"
      style="height: 33rem;overflow: scroll;overflow-x: hidden;
    overflow-y: scroll;"
    >
    <!-- <template #header="{}">
      <div style="background-color:rgba(255,255,255,0.7);position:fixed;z-index:1;">
        <span class="fine-font">{{structureBody.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <router-link style="float:right" target="_blank" :to="{name:'blogDetail',query:{relativeId:currentRelativeId}}">打开正文&gt;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;</router-link>   
      </div>
      
      </template> -->
      <BlogDetail ref="structureBlog" :key="componentTime" :fromFlag="fromFlag" :outerRelativeId="currentRelativeId" @detailClose="detailHandleClose"/>
      
    </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import { ElSwitch, ElColorPicker, ElMessage } from 'element-plus'
import EchartsTree from '@/views/component/echartTree.vue'
import BlogDetail from '@/views/blog/detail/blogDetail.vue'
import { ref,onMounted,reactive, nextTick } from 'vue'
import {isEmpty} from "@/utils/common.js"
import { getStrucNameList,queryOneStruc,updateStruc,addStruc} from "@/js/structure.js"
import store from '@/store'

const componentTime = Date.now()
const fromFlag = ref(1)
const structureBlog = ref<any>()

const structureList = ref([])
const showDetail = ref(false)
const currentRelativeId = ref("")
const cloneNodeDrag = ref(false)

const props = reactive({id: 'id', pid: 'pid', label: 'label', expand: 'expand',children: 'children' })
// const structureBody = reactive({
//   id:"1",
//   name:"",
//   data:{}
// })
const structureBody = ref()
const labelstyle = reactive({
    background: "#fff",
    width: "max-content",
    color: "#5e6d82",
    cursor:"pointer"
})


onMounted(() => {

  getStructureNameList()
})

const openArticle = (nodeValue) =>{
  if(isEmpty(nodeValue)){
      return
  }  
    showDetail.value = true;
    currentRelativeId.value = nodeValue
    
    nextTick(() => {
      structureBlog.value.blogRefresh(currentRelativeId.value)
    }) 
}


const openBlog = () =>{
  return
}

const switchStruc = (strucId) =>{
      queryOneStruc({"id":strucId}).then((resp:any) => {
        if(resp.code == "0"){
          structureBody.value = {
            id:resp.data.id,
            data:resp.data.value,
            name:resp.data.name,
          };
          console.log(2222222222,structureBody.value)
        }else{
            ElMessage.error(resp.msg)
        }
    })
    .catch((e) => {
      return
    })
}
const detailHandleClose = () =>{
  showDetail.value = false
  currentRelativeId.value = ""
  console.log("detailHandleClose")
}

const getStructureNameList =() =>{
  getStrucNameList().then((resp:any) => {
        if(resp.code == "0"){
          structureList.value = resp.data
          if(!isEmpty(structureList.value)){
            switchStruc(structureList.value[0].id)
          }
        }else{
            ElMessage.error(resp.msg)
        }
    })
    .catch((e) => {
      return
    })
}
</script>

<style  lang="less" scoped>

/deep/ .el-dialog__body{
  padding:0px
}

/deep/ .el-card__body{
  padding:0px
}
/deep/ ::-webkit-scrollbar{width:0;}

/deep/ .blog-detail-card{
  box-shadow: none;
  border: none;
}

/deep/ .el-dialog__header {
  display: none;
}
</style>