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
                          default-active="2"
                          text-color="#fff"
                          @open="handleOpen"
                          @close="handleClose"
                        >
                          <el-menu-item v-for="(item,index) in structureList" :key="index" :index="index" @click="switchStruc(item.id)">
                            <el-icon><location /></el-icon>
                            <span>{{item.label}}</span>
                          </el-menu-item>
                        </el-menu>
                      </el-header>
                      <el-main>
                              <div class="fine-font breadcrumb">
                                  <el-breadcrumb :separator-icon="ArrowRight">
                                    <el-breadcrumb-item :to="{ path: '/view' }">首页</el-breadcrumb-item>
                                    <el-breadcrumb-item>大纲</el-breadcrumb-item>
                                  </el-breadcrumb>
                                </div>

                                    <el-row>
                                      <el-col :span="24">&nbsp;</el-col>
                                    </el-row>
                                    <el-row class="independent_row">
                                      <el-col :span="24" style="text-align: left;"><span class="title_level_1">{{structureBody.name}}</span></el-col>
                                    </el-row>

                            <el-divider content-position="left" ></el-divider>
                                  <div style="height: 35rem;">
                                    <vue3-tree-org
                                      :default-expand-level="99"
                                      :data="structureBody.value"
                                      :disabled="true"
                                      :node-draggable="false"
                                      :center="false"
                                      :scalable="false"
                                      :horizontal="true"
                                      :collapsable="true"
                                      :label-style="labelstyle"
                                      :clone-node-drag="cloneNodeDrag"
                                      :props="props"
                                      @on-node-click="onNodeClick"
                                    >
                                            <template v-slot="{node}">
                                                <div class="tree-org-node__text node-label node" @contextmenu.prevent="terFun(node)">
                                                  {{ node.label.split("_")[0]}}
                                                  <div v-if=" node.open" class="late" id="lateId">
                                                    <el-input placeholder="请输入label" style="padding-bottom:5px" v-model="node.label"/>
                                                    <div @click="closeEdit(node)" class="onCloseCss">确定</div>
                                                  </div>
                                                </div>
                                              </template>
                                              <!-- 自定义展开按钮 -->
                                              <!-- <template v-slot:expand="{node}">
                                                <div>{{ node.children.length }}</div>
                                              </template> -->
                                            </vue3-tree-org>
                                  </div>

                            <el-divider content-position="left"></el-divider>
                                    <el-row class="independent_row">
                                      <el-col :span="24" style="text-align: left;">
                                        <span class="fine-font small-font" style="float:right">结构图支撑：vue3-tree-org</span>
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
      style="height: 38rem;overflow: scroll;overflow-x: hidden;
    overflow-y: scroll;"
      :before-close="detailHandleClose"
    ><template #header="{}">
      <div style="background-color:rgba(255,255,255,0.7);position:fixed;z-index:1;">
        <span class="fine-font">{{structureBody.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <!-- <span @click="openBlog" style="font-size:larger;cursor:pointer">打开正文>>></span> -->
        <router-link style="float:right" target="_blank" :to="{name:'blogDetail',query:{relativeId:currentRelativeId}}">打开正文&gt;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;</router-link>   
      </div>
      
      </template>
      <BlogDetail ref="structureBlog" :key="componentTime"/>
    </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import { ElSwitch, ElColorPicker, ElMessage } from 'element-plus'
import 'vue3-tree-org/lib/vue3-tree-org.css'
import BlogDetail from '@/views/blog/detail/blogDetail.vue'
import { ref,onMounted,reactive, nextTick } from 'vue'
import {isEmpty} from "@/utils/common.js"
import { getStrucNameList,queryOneStruc,updateStruc,addStruc} from "@/js/structure.js"
import store from '@/store'

const componentTime = Date.now()
const structureBlog = ref<any>()

const structureList = ref([])
const showDetail = ref(false)
const currentRelativeId = ref("")
const cloneNodeDrag = ref(false)

const props = reactive({id: 'id', pid: 'pid', label: 'label', expand: 'expand',children: 'children' })
const structureBody = reactive({
  id:"",
  name:"",
  value:{"id":"","label":""}
})
const labelstyle = reactive({
    background: "#fff",
    width: "max-content",
    color: "#5e6d82",
    cursor:"pointer"
})




onMounted(() => {
  getStructureNameList()
})

const onNodeClick = (event,node) =>{
  let tempRelativeId = node.label.split("_")[1];
  if(isEmpty(tempRelativeId)){
      return
  }  
    showDetail.value = true;
    currentRelativeId.value = tempRelativeId
    
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
          structureBody.id = resp.data.id
          structureBody.name = resp.data.name
          structureBody.value = resp.data.value
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


/deep/ ::-webkit-scrollbar{width:0;}
</style>