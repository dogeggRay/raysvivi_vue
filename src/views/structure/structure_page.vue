<template>
  <div class = "inner-container">
    <el-card class="about-card fine-font" shadow="always">
        <div style="display: flex; padding: 10px;" v-if="store.getters['accessToken']">
            <div style="margin-right: 10px"><el-switch v-model="horizontal"></el-switch> 横向</div>
            <div style="margin-right: 10px"><el-switch v-model="collapsable"></el-switch> 可收起</div>
            <div style="margin-right: 10px"><el-switch v-model="disaled"></el-switch> 禁止编辑</div>
            <div style="margin-right: 10px"><el-switch v-model="onlyOneNode"></el-switch> 仅拖动当前节点</div>
            <div style="margin-right: 10px"><el-switch v-model="cloneNodeDrag"></el-switch> 拖动节点副本</div>
        </div>
    <div style="padding: 0 10px 10px">
      背景色：<el-color-picker v-model="style.background" size="small"></el-color-picker>&nbsp;
      文字颜色：<el-color-picker v-model="style.color" size="small"></el-color-picker>&nbsp;
    </div>
      <div style="height: 400px;">
        <vue3-tree-org
          :data="data"
          :center="false"
          :horizontal="horizontal"
          :collapsable="collapsable"
          :label-style="style"
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
    </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ElSwitch, ElColorPicker, ElMessage } from 'element-plus'
import 'vue3-tree-org/lib/vue3-tree-org.css'
import { ref,onMounted,reactive } from 'vue'
import store from '@/store'

const cloneNodeDrag = ref(true)

const horizontal= ref(true)
const collapsable=ref(false)
const onlyOneNode=ref(false)
const expandAll=ref(true)
const disaled=ref(true)
const style = reactive({
    background: "#fff",
    width: "max-content",
    color: "#5e6d82",
})

const data = reactive({
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
      })



onMounted(() => {
  console.log("hello")
})
</script>

<style>

</style>