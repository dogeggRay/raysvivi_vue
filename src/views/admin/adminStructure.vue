<template>
  <div class = "inner-container fine-font">
        <!-- <div style="display: flex; padding: 10px;" v-if="store.getters['accessToken']"> -->
          <div style="display: flex; padding: 10px;">
            <div style="margin-right: 10px"><el-switch v-model="horizontal"></el-switch> 横向</div>
            <div style="margin-right: 10px"><el-switch v-model="collapsable"></el-switch> 可收起</div>
            <div style="margin-right: 10px"><el-switch v-model="disaledFlag"></el-switch> 禁止编辑</div>
            <div style="margin-right: 10px"><el-switch v-model="onlyOneNode"></el-switch> 仅拖动当前节点</div>
            <div style="margin-right: 10px"><el-switch v-model="cloneNodeDrag"></el-switch> 拖动节点副本</div>


            <div style="margin-right: 10px"><el-button @click="addData">新增</el-button> </div>
            <div style="margin-right: 10px"><el-button @click="updateData">更新</el-button> </div>
        </div>
    <div style="padding: 0 10px 10px">
      背景色：<el-color-picker v-model="labelstyle.background" size="small"></el-color-picker>&nbsp;
      文字颜色：<el-color-picker v-model="labelstyle.color" size="small"></el-color-picker>&nbsp;
    </div>
      <div style="height: 600px;">
        <vue3-tree-org
          :default-expand-level="1"
          :data="structureBody.value"
          :disabled="disaledFlag"
          :center="false"
          :scalable="false"
          :horizontal="horizontal"
          :collapsable="collapsable"
          :label-style="labelstyle"
          :only-one-node="onlyOneNode"
          :clone-node-drag="cloneNodeDrag"
          :before-drag-end="beforeDragEnd"
          @on-node-drag="nodeDragMove"
          @on-node-drag-end="nodeDragEnd"
          @on-contextmenu="onMenus"
          @on-expand="onExpand"
          @on-node-dblclick="onNodeDblclick"
          @on-node-click="onNodeClick"
        />
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ElSwitch, ElColorPicker, ElMessage } from 'element-plus'
import 'vue3-tree-org/lib/vue3-tree-org.css'
import { ref,onMounted,reactive } from 'vue'
import { getNameList,queryOneStruc,updateStruc,addStruc} from "@/js/structure.js"
import store from '@/store'

const cloneNodeDrag = ref(true)

const horizontal= ref(true)
const collapsable=ref(true)
const onlyOneNode=ref(false)
const expandAll=ref(true)
const disaledFlag=ref(true)

const structureBody = reactive({
  name:"demo",
  value:{
          "id":1,"label":"xxx科技有限公司",
          "children":[
              {
                  "id":2,"pid":1,"label":"产品研发部",
                  "style":{"color":"#fff","width": "max-content","background":"#108ffe"},
                  "children":[
                      {"id":6,"pid":2,"label":"禁止编辑节点","disabled":true},
                      {"id":8,"pid":2,"label":"禁止拖拽节点","noDragging":true},
                      {"id":10,"pid":2,"label":"测试"}
                  ]
              },
              {
                  "id":3,"pid":1,"label":"客服部",
                  "children":[
                      {"id":11,"pid":3,"label":"客服一部"},
                      {"id":12,"pid":3,"label":"客服二部"}
                  ]
              },
              {"id":4,"pid":1,"label":"业务部"}
          ]
      }
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
  console.log(node)
}

const addData = () =>{
  addStruc(structureBody).then((resp:any) => {
        if(resp.code == "0"){
          return
        }else{
            ElMessage.error(resp.msg)
        }
    })
    .catch((e) => {
      return
    })
}
</script>

<style>

</style>