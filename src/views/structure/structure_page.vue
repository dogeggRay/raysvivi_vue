<template>
  <div class = "inner-container">
    <el-card class="about-card fine-font" shadow="always">


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

    </el-card>



<!-- 明细弹框     -->
    <el-dialog
      v-model="showDetail"
      destroy-on-close
      show-close
      width="70%"
      :before-close="detailHandleClose"
    ><template #header="{}">
      <span class="fine-font small-font">{{structureBody.name}}</span>
      <!-- <span @click="openBlog" style="font-size:larger;cursor:pointer">打开正文>>></span> -->
      <router-link style="float:right" target="_blank" :to="{name:'blogDetail',query:{relativeId:currentRelativeId}}">打开正文&gt;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;</router-link>   
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
import { getNameList,queryOneStruc,updateStruc,addStruc} from "@/js/structure.js"
import store from '@/store'

const componentTime = Date.now()
const structureBlog = ref<any>()

const showDetail = ref(false)
const currentRelativeId = ref("")
const cloneNodeDrag = ref(false)

const props = reactive({id: 'id', pid: 'pid', label: 'label', expand: 'expand',children: 'children' })
const structureBody = reactive({
  name:"demo",
  value:{"children":[{"children":[],"id":"1679555182623","label":"11111_acb05a3c1b44860ed4d8cf218342e6e8","pid":"1"}],"id":"1","label":"第一个节点"}
})
const labelstyle = reactive({
    background: "#fff",
    width: "max-content",
    color: "#5e6d82",
    cursor:"pointer"
})




onMounted(() => {
  console.log("hello")
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

const detailHandleClose = () =>{
  showDetail.value = false
  currentRelativeId.value = ""
  console.log("detailHandleClose")
}
</script>

<style  lang="less" scoped>

/deep/ .el-dialog__body{
  padding:0px
}
</style>